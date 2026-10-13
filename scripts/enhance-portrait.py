#!/usr/bin/env python3
"""Create an HD transparent hero image from the real site portrait.

Uses a small CPU super-resolution model when available, never replaces facial
features or invents a face, and keeps the original alpha transparency.
"""
from __future__ import annotations

from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

import cv2
import numpy as np
from PIL import Image, ImageFilter

INPUT = Path("public/images/zilu-cutout.webp")
OUTPUT = Path("public/images/zilu-cutout-hd.webp")
MODEL = "https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x4.pb"
FACTOR = 4

def main() -> None:
    source = Image.open(INPUT).convert("RGBA")
    width, height = source.size
    assert width >= 200 and height >= 250, f"Source portrait unexpectedly small: {source.size}"
    target = (width * FACTOR, height * FACTOR)

    base = source.convert("RGB").resize(target, Image.Resampling.LANCZOS)
    enhanced = base
    engine = "Lanczos fallback"
    try:
        req = Request(MODEL, headers={"User-Agent": "zilu.dev-portrait-enhancer/1.0"})
        with urlopen(req, timeout=35) as response:
            model_bytes = response.read()
        if not (5000 < len(model_bytes) < 15_000_000):
            raise ValueError("Super-resolution model size out of bounds")
        import tempfile
        with tempfile.NamedTemporaryFile(suffix=".pb") as handle:
            handle.write(model_bytes)
            handle.flush()
            sr = cv2.dnn_superres.DnnSuperResImpl_create()
            sr.readModel(handle.name)
            sr.setModel("fsrcnn", FACTOR)
            bgr = cv2.cvtColor(np.asarray(source.convert("RGB")), cv2.COLOR_RGB2BGR)
            hd = sr.upsample(bgr)
        rgb = Image.fromarray(cv2.cvtColor(hd, cv2.COLOR_BGR2RGB))
        if rgb.size != target:
            raise ValueError(f"Invalid super-resolution dimensions: {rgb.size}")
        # Mix 20% faithful Lanczos pixels to avoid aggressive hallucinated texture.
        enhanced = Image.blend(rgb, base, 0.20)
        engine = "FSRCNN ×3 + faithful Lanczos blend"
    except Exception as exc:
        print(f"Super-resolution model unavailable; using high-quality scaling: {exc}")

    enhanced = enhanced.filter(ImageFilter.UnsharpMask(radius=1.0, percent=68, threshold=3))
    alpha = source.getchannel("A").resize(target, Image.Resampling.LANCZOS)
    enhanced.putalpha(alpha)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    enhanced.save(OUTPUT, format="WEBP", quality=90, method=5, exact=True)

    result = Image.open(OUTPUT).convert("RGBA")
    assert result.size == target
    assert result.getpixel((0, 0))[3] <= 16
    assert result.getpixel((target[0]-1, 0))[3] <= 16
    print(f"Portrait: {source.size} -> {result.size}; {OUTPUT.stat().st_size:,} bytes; engine={engine}")

if __name__ == "__main__":
    main()
