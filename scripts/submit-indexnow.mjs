import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const host = 'zilu.dev';
const key = process.env.INDEXNOW_KEY;
if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Missing or invalid IndexNow key');

const current = JSON.parse(readFileSync('news/briefings.json', 'utf8'));
const byDate = (items) => new Map(items.map((edition) => [edition.date, edition]));
let previous = [];
const before = process.env.BEFORE_SHA;
if (before && !/^0+$/.test(before)) {
  try {
    previous = JSON.parse(execFileSync('git', ['show', before + ':news/briefings.json'], { encoding: 'utf8' }));
  } catch (error) {
    throw new Error('Cannot read previous briefings; refusing to submit unchanged URLs: ' + error.message);
  }
} else if (process.env.GITHUB_EVENT_NAME !== 'workflow_dispatch') {
  throw new Error('Missing prior revision; refusing to submit all pages');
}

const old = byDate(previous);
let changed = current.filter((item) => JSON.stringify(item) !== JSON.stringify(old.get(item.date)));
if (process.env.GITHUB_EVENT_NAME === 'workflow_dispatch' && !before) {
  changed = [...current].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 1);
}
if (!changed.length) {
  console.log('No changed news editions. Nothing to submit.');
  process.exit(0);
}

const urls = changed.map(({ date }) => 'https://' + host + '/news/' + date + '-daily-tech-news/');
const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([a-f0-9]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const normalize = (s) => decode(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function fetchLive(url) {
  const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return normalize(await response.text());
}

// Never notify crawlers until the live deployment contains the latest article content.
for (const [i, url] of urls.entries()) {
  const edition = changed[i];
  const title = edition.stories?.[0]?.headline;
  if (!title) throw new Error('Missing first headline for ' + edition.date);
  let ready = false;
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      const htmlText = await fetchLive(url);
      if (htmlText.includes(normalize(title))) {
        ready = true;
        break;
      }
      console.log('Page not updated yet: ' + url + ' (attempt ' + attempt + ')');
    } catch (error) {
      console.log('Page not live yet: ' + url + ' (' + error.message + ')');
    }
    if (attempt < 30) await wait(20000);
  }
  if (!ready) throw new Error('Live deployment not confirmed for ' + url);
}

const keyLocation = 'https://' + host + '/' + key + '.txt';
const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error('IndexNow key file is not publicly verifiable');
}
const result = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList: [...new Set(['https://' + host + '/news/', ...urls])] }),
  signal: AbortSignal.timeout(20000),
});
const body = await result.text();
if (![200, 202].includes(result.status)) {
  throw new Error('IndexNow rejected submission: ' + result.status + ' ' + body.slice(0, 500));
}
console.log('IndexNow accepted ' + urls.length + ' updated edition(s) plus /news/ (HTTP ' + result.status + '). Indexing is not guaranteed.');
