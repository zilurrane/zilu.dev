import sharp from 'sharp';
import { access, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const dir = 'public/images';
const original = join(dir, 'zilu-portrait-2026-hd.webp');
await access(original);
const widths = [80, 384, 684, 960];
await mkdir(dir, { recursive: true });
const originalStat = await stat(original);
for (const width of widths) {
  const destination = join(dir, `zilu-portrait-2026-${width}.webp`);
  let regenerate = true;
  try {
    const existing = await stat(destination);
    regenerate = existing.mtimeMs < originalStat.mtimeMs;
  } catch {}
  if (!regenerate) continue;
  const info = await sharp(original)
    .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: width <= 80 ? 75 : 78, effort: 5 })
    .toFile(destination);
  console.log(`Generated ${destination}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KiB`);
}
