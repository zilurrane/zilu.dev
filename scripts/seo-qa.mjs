import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist='dist';
const origin='https://zilu.dev';
const json=JSON.parse(readFileSync('news/briefings.json','utf8'));
const read=(path)=>readFileSync(path,'utf8');
const htmlPaths=[];
function walk(dir){
 for(const ent of readdirSync(dir,{withFileTypes:true})){
  const full=join(dir,ent.name);
  if(ent.isDirectory())walk(full);
  else if(ent.isFile() && ent.name.endsWith('.html'))htmlPaths.push(full);
 }
}
walk(dist);
assert(htmlPaths.length>=10,'Expected all main and project routes in dist/');
assert(Array.isArray(json) && json.length>=1,'News JSON must be an array of editions');
assert.deepEqual(json.map(e=>e.date),[...json].map(e=>e.date).sort().reverse(),'Newest news edition first');
assert.equal(new Set(json.map(e=>e.date)).size,json.length,'Duplicate news edition date');
for(const e of json){
 assert(/^\d{4}-\d\d-\d\d$/.test(e.date),'Invalid date '+e.date);
 assert(Array.isArray(e.stories) && e.stories.length===5,'Expected five news stories for '+e.date);
 for(const story of e.stories){
  assert.deepEqual(Object.keys(story).sort(),['category','headline','summary','source_url','why_it_matters'].sort(),'Unexpected story fields');
  for(const key of ['category','headline','summary','why_it_matters','source_url'])assert(typeof story[key]==='string' && story[key].trim(),'Missing '+key);
  const u=new URL(story.source_url);
  assert.equal(u.protocol,'https:','Source must be HTTPS');
  assert(u.hostname && u.pathname!=='/','Source must link to the specific report, not the publisher homepage: '+story.source_url);
 }
}

function canonicalPath(file){
 const rel=relative(dist,file).split(sep).join('/');
 if(rel==='index.html')return '/';
 if(rel.endsWith('/index.html'))return '/'+rel.slice(0,-'index.html'.length);
 if(rel==='404.html')return '/404.html';
 return '/'+rel;
}
const errors=[], results=[];
for(const file of htmlPaths){
 const html=read(file), path=canonicalPath(file);
 const is404=path.startsWith('/404');
 const h1s=(html.match(/<h1(?:\s|>)/gi)||[]).length;
 const canonicalTags=html.match(/<link\b[^>]*rel="canonical"[^>]*>/gi)||[];
 const robots=html.match(/<meta\b[^>]*name="robots"[^>]*>/i)?.[0]??'';
 assert.equal(h1s,1,'Missing or duplicate H1 '+path);
 assert.match(html,/<main\b[^>]*\bid="main"/,'Main landmark missing '+path);
 assert.match(html,/<nav\b[^>]*aria-label="Main navigation"/,'Main navigation missing '+path);
 assert.match(html,/<meta\b[^>]*name="description"/,'Meta description missing '+path);
 assert.match(html,/<link\b[^>]*rel="icon"[^>]*href="\/favicon.svg"/,'Favicon missing '+path);
 if(is404){
  assert.match(robots,/noindex/,'404 must be noindex');
  assert.equal(canonicalTags.length,0,'404 should not have canonical');
 }else{
  assert.equal(canonicalTags.length,1,'Missing or duplicate canonical '+path);
  assert(canonicalTags[0].includes('href="'+origin+path+'"'),'Incorrect canonical for '+path+': '+canonicalTags[0]);
  assert(!robots.includes('noindex'),'Unexpected noindex on '+path);
 }
 const ldText=html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
 assert(ldText,'Missing JSON-LD '+path);
 let ld;
 try{ld=JSON.parse(ldText)}catch(e){throw Error('Invalid JSON-LD on '+path+': '+e)}
 const graph=ld['@graph']??[];
 assert(graph.some(e=>e['@type']==='WebSite'),'Missing WebSite graph node '+path);
 assert(graph.some(e=>e['@type']==='Person'),'Missing Person graph node '+path);
 if(!is404 && path!=='/')assert(graph.some(e=>e['@type']==='BreadcrumbList'),'Missing BreadcrumbList '+path);
 if(path.startsWith('/news/') && path.endsWith('-daily-tech-news/')){
  assert(graph.some(e=>e['@type']==='BlogPosting'),'Curated daily digest must use BlogPosting '+path);
  assert.equal((html.match(/class="story"/g)||[]).length,5,'Five full story cards required '+path);
  assert.equal((html.match(/class="impact"/g)||[]).length,5,'Five why-it-matters required '+path);
  assert.equal((html.match(/ORIGINAL REPORT/g)||[]).length,5,'Five primary source links required '+path);
 }
 if(path==='/news/'){
  assert.equal((html.match(/class="story"/g)||[]).length,5,'News listing must display five teasers');
  assert.equal((html.match(/class="impact"/g)||[]).length,0,'News listing duplicates full article content');
  assert.match(html,/\/news\/\d{4}-\d\d-\d\d-daily-tech-news\/#story-1/,'Teaser-to-edition link missing');
  assert.match(html,/href="\/news\/archive\/"/,'News archive link missing from sidebar');
 }
 results.push({path,valid:true});
}
const sitemapIndex=read('dist/sitemap-index.xml');
const sitemap=read('dist/sitemap-0.xml');
assert.match(sitemapIndex,/sitemap-0\.xml/);
assert(!sitemap.includes('/404/'),'Noindex 404 must be excluded from sitemap');
const required=['/','/projects/','/about/','/writing/','/resume/','/news/','/news/archive/',...json.map(e=>'/news/'+e.date+'-daily-tech-news/')];
for(const url of required){
 assert(sitemap.includes(origin+url),'Missing canonical sitemap route: '+url);
 const file=url==='/'?'dist/index.html':'dist'+url+'index.html';
 assert(existsSync(file),'Missing built HTML for '+url);
}
const archivePages=htmlPaths.filter(f=>/^\/news\/archive\/(?:\d+\/)?$/.test(canonicalPath(f)));
const archiveHtml=archivePages.map(read).join('\n');
for(const e of json)assert(archiveHtml.includes('/news/'+e.date+'-daily-tech-news/'),'Edition not discoverable from archive: '+e.date);
const redirects=read('dist/_redirects');
assert.match(redirects,/\/resume\.html \/resume\/ 301/,'Legacy resume redirect missing');
assert.match(redirects,/\/sitemap\.xml \/sitemap-index\.xml 301/);
assert.match(read('dist/robots.txt'),/Sitemap: https:\/\/zilu\.dev\/sitemap-index\.xml/);
assert(read('dist/favicon.svg').includes('<svg'),'Missing favicon asset');
console.log('SEO QA passed:',results.length,'HTML pages,',json.length,'news editions, sitemap, schema, archive, redirects, canonicals and favicon.');
