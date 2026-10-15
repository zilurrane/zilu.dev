import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
console.log('Source tree SHA: '+execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim());

const origin=process.env.VISUAL_QA_ORIGIN||'http://127.0.0.1:4321';
const browser=await chromium.launch({headless:true});
const profiles=[
 {name:'wide',width:1700,height:960},{name:'desktop',width:1440,height:900},
 {name:'laptop',width:1024,height:900},{name:'tablet',width:768,height:1024},
 {name:'mobile',width:390,height:844},{name:'small-mobile',width:320,height:740}
];
const results=[];
const routes=['/','/news/','/projects/','/projects/querydeck/','/writing/','/about/','/resume/','/404.html'];
mkdirSync('visual-qa-results',{recursive:true});
try {
 for(const profile of profiles){
  for(const theme of ['light','dark']){
   const page=await browser.newPage({viewport:{width:profile.width,height:profile.height},deviceScaleFactor:1});
   for(const path of routes){
    const response=await page.goto(origin+path,{waitUntil:'domcontentloaded'});
    assert(path==='/404.html'?[200,404].includes(response?.status()):response?.status()===200,'HTTP status on '+path+': '+response?.status());
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    const diagnostics=await page.evaluate(()=>{
      const h1=document.querySelector('h1');
      return {
       viewport:window.innerWidth,
       scrollWidth:document.documentElement.scrollWidth,
       heading:h1?.textContent?.trim()||'',
       headings:document.querySelectorAll('h1').length,
       hasMain:document.querySelectorAll('main').length===1,
       hasHeader:!!document.querySelector('header'),
       hasFooter:!!document.querySelector('footer'),
       hiddenHeading:!h1||h1.getBoundingClientRect().width===0||h1.getBoundingClientRect().height===0
      };
    });
    assert(diagnostics.hasMain && diagnostics.hasHeader && diagnostics.hasFooter,'Missing landmarks on '+path);
    assert.equal(diagnostics.headings,1,'Page must have one visible H1 '+path);
    assert(!diagnostics.hiddenHeading,'Hidden heading '+path);
    assert(diagnostics.scrollWidth<=diagnostics.viewport+3,
      'Horizontal overflow '+path+' '+profile.name+' '+theme+' '+JSON.stringify(diagnostics));
    if(path==='/'){
      const photo=page.locator('.portrait-card .portrait');
      assert.equal(await photo.count(),1,'Expected the mockup hero portrait');
      assert.match(await photo.getAttribute('alt'),/Zilu Rane/i,'Portrait alt text');
      await photo.evaluate(img=>img.decode());
      const size=await photo.evaluate(img=>({w:img.naturalWidth,h:img.naturalHeight}));
      assert(size.w>=900 && size.h>=1100,'Portrait source too small: '+JSON.stringify(size));
      const card=await page.locator('.portrait-card').boundingBox();
      assert(card && card.x>=8 && card.x+card.width<=profile.width+2,'Hero card outside viewport '+profile.name);
      assert.equal(await page.locator('.projects-grid .project').count(),2,'Expected two wireframe project cards');
      assert.equal(await page.locator('.news-preview .news-preview-item').count(),3,'Expected three latest news links');
      const columns=await page.evaluate(()=>{
        const hero=document.querySelector('.hero').getBoundingClientRect();
        const stats=document.querySelector('.quick-cards').getBoundingClientRect();
        const projects=document.querySelector('.projects').getBoundingClientRect();
        return {heroLeft:hero.left,statsLeft:stats.left,projectsLeft:projects.left,heroRight:hero.right,statsRight:stats.right};
      });
      assert(Math.abs(columns.statsLeft-columns.heroLeft)<=2 && Math.abs(columns.statsRight-columns.heroRight)<=2,
        'Statistic cards must align with the hero content shell: '+JSON.stringify(columns));
      assert(Math.abs(columns.projectsLeft-columns.heroLeft)<=2,'Projects section should share the same content shell');
    }
    if(path==='/news/'){
      assert.equal(await page.locator('.news-list .story').count(),5,'Expected five sourced news stories');
      assert.equal(await page.locator('.story .impact').count(),5,'Missing why-it-matters blocks');
      assert.equal(await page.locator('.story .source-link[href^="https://"]').count(),5,'Missing primary-source links');
    }
    if(path==='/projects/'){
      assert.equal(await page.locator('.neo-grid .neo-card-link').count(),6,'Project listing should render all six repository case studies');
      assert.equal(await page.locator('.neo-grid .neo-art[role="img"]').count(),6,'Each project needs its honest conceptual art');
      assert.equal(await page.locator('.neo-page h1.neo-h1').count(),1,'Projects must use neo page hierarchy');
    }
    if(path==='/projects/querydeck/'){
      assert.equal(await page.locator('article .neo-article-layout').count(),1,'Missing project detail layout');
      assert.equal(await page.locator('.neo-article-visual .neo-art').count(),1,'Missing project visual');
      assert.equal(await page.locator('.neo-reading h2').count()>=4,true,'Missing semantic case-study sections');
    }
    if(path==='/writing/'){
      assert.equal(await page.locator('.neo-writing-card').count(),3,'Writing page must show three real articles');
      assert.equal(await page.locator('.neo-writing-card a[href^="https://dev.to/"]').count(),3,'Original writing sources missing');
      assert.equal(await page.locator('.neo-writing-card time[datetime]').count(),3,'Article dates must be semantic time tags');
    }
    if(path==='/about/'){
      assert.equal(await page.locator('.neo-portrait-wrap img[alt]').count(),1,'About portrait missing');
      assert.equal(await page.locator('.neo-article-layout .neo-reading').count(),1,'About narrative missing');
    }
    if(path==='/resume/'){
      assert.equal(await page.locator('.neo-timeline-item').count(),6,'Resume must preserve six career entries');
      assert.equal(await page.locator('.neo-sidebar .neo-tags span').count(),14,'Resume expertise tags missing');
    }
    if(path==='/404.html'){
      assert.match((await page.locator('meta[name="robots"]').getAttribute('content'))||'',/noindex/,'404 should not be indexed');
      assert.equal(await page.locator('.neo-404 h1').count(),1,'Custom 404 headline missing');
    }
    if(path.startsWith('/projects/') && path!=='/projects/'){
      assert.equal(await page.locator('.neo-breadcrumb[aria-label="Breadcrumb"]').count(),1,'Project breadcrumbs missing');
    }
    const slug=path==='/'?'home':path.replace(/\//g,'');
    await page.screenshot({path:'visual-qa-results/'+slug+'-'+profile.name+'-'+theme+'.png',fullPage:true});
    results.push({page:path,profile:profile.name,theme,...diagnostics,status:'PASS'});
   }
   await page.close();
  }
 }
 const page=await browser.newPage();
 await page.goto(origin+'/news/',{waitUntil:'domcontentloaded'});
 await page.locator('#story-search').fill('__unlikely_matching_search_term__');
 assert.equal(await page.locator('.news-list .story:visible').count(),0,'Search should hide unmatched articles');
 assert.equal(await page.locator('#empty-results:visible').count(),1,'Empty state not shown');
 await page.locator('#clear-filters').click();
 assert.equal(await page.locator('.news-list .story:visible').count(),5,'Clear must restore stories');
 await page.locator('[data-filter="ai"]').click();
 assert.equal(await page.locator('.news-list .story:visible').count(),1,'Category filter should display one AI story');
 await page.locator('[data-filter="all"]').click();
 assert.equal(await page.locator('.news-list .story:visible').count(),5,'All categories should restore stories');
 for(const slug of ['enterprise-applications','linkedin-signal-agent','whatsapp-actions','ticketing','learnings']){
   const response=await page.goto(origin+'/projects/'+slug+'/',{waitUntil:'domcontentloaded'});
   assert.equal(response?.status(),200,'Project case study route failed: '+slug);
   assert.equal(await page.locator('h1').count(),1,'Case study must have one H1: '+slug);
   assert.equal(await page.locator('.neo-article-layout .neo-art[role="img"]').count(),1,'Concept art missing for '+slug);
   assert.equal(await page.locator('.neo-reading h2').count()>=4,true,'Case study sections missing for '+slug);
 }
 await page.goto(origin+'/news/',{waitUntil:'domcontentloaded'});
 const editionPath=await page.locator('.archive-link[href*="-daily-tech-news/"]').first().getAttribute('href');
 assert(editionPath,'Missing dated briefing link');
 const dated=await page.goto(origin+editionPath,{waitUntil:'domcontentloaded'});
 assert.equal(dated?.status(),200,'Dated news edition route is broken');
 assert.equal(await page.locator('.news-list .story').count(),5,'Dated news must show all five stories');
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),origin.replace('http://127.0.0.1:4321','https://zilu.dev')+editionPath);
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
 const button=page.locator('.theme-toggle');
 const initial=await page.locator('html').getAttribute('data-theme');
 await button.click();
 assert.notEqual(await page.locator('html').getAttribute('data-theme'),initial,'Theme toggle failed');
 assert.equal(await page.locator('a.skip-link').count(),1,'Skip-to-main link missing');
 await page.close();
 writeFileSync('visual-qa-results/report.json',JSON.stringify({status:'PASS',results},null,2));
 console.log('Neo-brutalist QA passed: '+results.length+' captures across all routes/themes, semantics, source links, filters and theme switching.');
} catch(err){
 writeFileSync('visual-qa-results/report.json',JSON.stringify({status:'FAIL',error:String(err),results},null,2));
 console.error(err);
 process.exitCode=1;
} finally {
 await browser.close();
}
