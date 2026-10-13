import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';

const origin = process.env.VISUAL_QA_ORIGIN || 'http://127.0.0.1:4321';
const browser = await chromium.launch({headless:true});
const profiles = [
  {name:'wide',width:1700,height:960},
  {name:'desktop',width:1440,height:900},
  {name:'laptop',width:1024,height:900},
  {name:'tablet',width:768,height:1024},
  {name:'mobile',width:390,height:844}
];
const results=[];
mkdirSync('visual-qa-results',{recursive:true});
try {
 for(const profile of profiles) {
  for(const theme of ['dark','light']) {
   const page=await browser.newPage({viewport:{width:profile.width,height:profile.height},deviceScaleFactor:1});
   for(const path of ['/','/news/','/projects/']) {
    const response=await page.goto(origin+path,{waitUntil:'domcontentloaded'});
    assert.equal(response?.status(),200,'Unexpected HTTP status at '+path);
    await page.evaluate(t=>{document.documentElement.dataset.theme=t},theme);
    if(path==='/'){
      const portrait=page.locator('.ed-hero-portrait-frame img');
      assert.equal(await portrait.count(),1,'Homepage must show exactly one portrait');
      assert.match(await portrait.getAttribute('alt'),/Zilu Rane/i,'Portrait alt text must identify the engineer');
      await portrait.evaluate(async img=>{await img.decode();});
      assert(await portrait.evaluate(img=>img.naturalWidth>0 && img.naturalHeight>0),'Portrait asset is missing or cannot decode');
      assert(['/images/zilu-cutout-hd.webp','/images/zilu-original-hd.webp'].includes(await portrait.getAttribute('src')),'Homepage must use the published transparent portrait, never the original photo');
      const alpha=await portrait.evaluate(img=>{
        const canvas=document.createElement('canvas');
        canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        ctx.drawImage(img,0,0);
        const pixel=(x,y)=>ctx.getImageData(x,y,1,1).data[3];
        return {topLeft:pixel(0,0),topRight:pixel(canvas.width-1,0),width:canvas.width,height:canvas.height};
      });
      assert(alpha.width>=900 && alpha.height>=1100,'Hero portrait must be at least 900×1100: '+JSON.stringify(alpha));
      const rendered=await portrait.evaluate(img=>({width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight}));
      assert(rendered.naturalWidth/rendered.width>=2,'Portrait is being stretched beyond 2x source density '+profile.name+' '+JSON.stringify(rendered));
      assert(rendered.naturalHeight/rendered.height>=2,'Portrait height exceeds available 2x source density '+profile.name+' '+JSON.stringify(rendered));
      assert(alpha.topLeft===0 && alpha.topRight===0,'Top corners of portrait must be genuinely transparent: '+JSON.stringify(alpha));
      assert(await portrait.evaluate(img=>getComputedStyle(img).clipPath==='none'),'The published transparent image must not depend on a hard CSS clip mask');
      const fit=await page.evaluate(()=>{
        const shell=document.querySelector('.ed-hero-content').getBoundingClientRect();
        const visual=document.querySelector('.ed-hero-visual').getBoundingClientRect();
        const photo=document.querySelector('.ed-hero-portrait-frame img').getBoundingClientRect();
        const copy=document.querySelector('.ed-hero-copy').getBoundingClientRect();
        return {shell:{left:shell.left,right:shell.right},visual:{left:visual.left,right:visual.right,top:visual.top},photo:{left:photo.left,right:photo.right},copy:{left:copy.left,right:copy.right,bottom:copy.bottom},viewport:innerWidth};
      });
      assert(fit.photo.left>=fit.shell.left-2 && fit.photo.right<=fit.shell.right+2,'Portrait escapes the content shell '+profile.name+' '+JSON.stringify(fit));
      assert(fit.visual.left>=fit.shell.left-2 && fit.visual.right<=fit.shell.right+2,'Portrait container escapes the content shell '+profile.name+' '+JSON.stringify(fit));
      assert(fit.photo.right<=fit.viewport-12 && fit.photo.left>=12,'Portrait clips against browser edge '+profile.name+' '+JSON.stringify(fit));
      if(profile.width>900)assert(fit.copy.right+14<=fit.visual.left,'Portrait overlaps headline column '+profile.name+' '+JSON.stringify(fit));
      // Prevent a hard-edged glow at the portrait grid column in either theme.
      const background=await page.evaluate(()=>{
        const hero=getComputedStyle(document.querySelector('.ed-hero'));
        const pageSurface=getComputedStyle(document.querySelector('.editorial-page'));
        const visual=document.querySelector('.ed-hero-visual');
        return {image:hero.backgroundImage,heroBase:hero.backgroundColor,pageBase:pageSurface.backgroundColor,visualBackground:getComputedStyle(visual).backgroundImage,hasLegacyOrb:!!document.querySelector('.ed-hero-orb')};
      });
      assert(background.image.includes('radial-gradient'),'Ambient gradient must be painted across the entire hero: '+JSON.stringify(background));
      assert.equal(background.heroBase,background.pageBase,'Hero/page background colors differ in '+theme+' theme: '+JSON.stringify(background));
      assert.equal(background.visualBackground,'none','Portrait column must not have a separate gradient');
      assert.equal(background.hasLegacyOrb,false,'Legacy glow is still being clipped by the portrait container');


    }
    await page.waitForTimeout(200);
    const diagnostics=await page.evaluate(()=>{
      const h1=document.querySelector('h1');
      const main=document.querySelector('main');
      return {
        scrollWidth:document.documentElement.scrollWidth,
        viewport:window.innerWidth,
        heading:h1?.textContent?.trim()||'',
        hasMain:!!main,
        hiddenHeading:h1?!!(h1.getBoundingClientRect().width===0||h1.getBoundingClientRect().height===0):true
      };
    });
    assert(diagnostics.hasMain,'Missing main landmark at '+path);
    assert(!diagnostics.hiddenHeading,'Missing visible heading at '+path);
    assert(diagnostics.scrollWidth<=diagnostics.viewport+3,
      'Horizontal overflow at '+path+' '+profile.name+' '+theme+': '+JSON.stringify(diagnostics));
    const slug=path==='/'?'home':path.replace(/\//g,'');
    await page.screenshot({path:'visual-qa-results/'+slug+'-'+profile.name+'-'+theme+'.png',fullPage:true});
    results.push({page:path,viewport:profile.name,theme,...diagnostics,status:'PASS'});
   }
   await page.close();
  }
 }
 const page=await browser.newPage();
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 assert.equal(await page.locator('.ed-feature-grid .ed-work-card').count(),3,'Homepage must show 3 mockup-aligned projects');
 assert.equal(await page.locator('.ed-news-items .ed-news-item').count(),3,'Homepage must show 3 compact news previews');
 assert.equal(await page.locator('.ed-hero h1').count(),1,'Homepage must have one hero title');
 const portrait = await page.locator('.ed-hero-portrait-frame img').evaluate(async img=>{
   await img.decode();
   const canvas=document.createElement('canvas');
   canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   ctx.drawImage(img,0,0);
   const corners=[[0,0],[canvas.width-1,0],[0,Math.round(canvas.height*.3)],[canvas.width-1,Math.round(canvas.height*.3)]];
   return {src:new URL(img.currentSrc).pathname,width:canvas.width,height:canvas.height,
      alphas:corners.map(([x,y])=>ctx.getImageData(x,y,1,1).data[3])};
 });
 assert(['/images/zilu-cutout-hd.webp','/images/zilu-original-hd.webp'].includes(portrait.src),'Homepage is still using the old photo with background');
 assert(portrait.width>=900,'Portrait is unexpectedly low resolution: '+portrait.width);
 assert(portrait.alphas.every(a=>a<32),'Portrait image has opaque background corners: '+JSON.stringify(portrait));

 await page.goto(origin+'/news/',{waitUntil:'domcontentloaded'});
 const inputs=page.locator('#news-search');
 await inputs.fill('__unfindable__');
 assert.equal(await page.locator('#filterable-news .ed-feed-card:visible').count(),0,'News filter did not hide unmatched rows');
 assert.equal(await page.locator('#news-empty:visible').count(),1,'News empty state missing');
 await page.close();
 writeFileSync('visual-qa-results/report.json',JSON.stringify({status:'PASS',results},null,2));
 console.log('Visual QA passed: '+results.length+' responsive/theme/page screenshots, home card counts, and news search.');
} catch(err) {
 writeFileSync('visual-qa-results/report.json',JSON.stringify({status:'FAIL',error:String(err),results},null,2));
 console.error(err);
 process.exitCode=1;
} finally {
 await browser.close();
}
