/* Daily news renderer. Stories are stored in briefings.json. */
(async function () {
  const feed = document.getElementById('feed');
  const element = (tag, content, className) => {
    const el = document.createElement(tag);
    el.textContent = content || '';
    if (className) el.className = className;
    return el;
  };
  try {
    const response = await fetch('./briefings.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('News unavailable');
    const briefings = await response.json();
    if (!Array.isArray(briefings)) throw new Error('Unexpected news format');
    const valid = briefings
      .filter(item => item && /^\d{4}-\d{2}-\d{2}$/.test(item.date) && Array.isArray(item.stories) && item.stories.length === 5)
      .sort((a, b) => b.date.localeCompare(a.date));
    feed.replaceChildren();
    if (!valid.length) {
      feed.append(element('p', 'No news published yet. Check back after the first edition.'));
      return;
    }
    for (const briefing of valid) {
      const section = document.createElement('section');
      section.append(element('h2', briefing.date));
      briefing.stories.forEach((story, index) => {
        const article = document.createElement('article');
        article.append(
          element('small', String(index + 1).padStart(2, '0') + ' / ' + (story.category || 'NEWS')),
          element('h3', story.headline),
          element('p', story.summary),
          element('p', 'Why it matters: ' + (story.why_it_matters || ''))
        );
        if (typeof story.image_url === 'string' && story.image_url.startsWith('https://')) {
          const img = document.createElement('img');
          img.src = story.image_url;
          img.alt = story.image_alt || story.headline || 'News illustration';
          img.loading = 'lazy';
          article.append(img);
        }
        if (typeof story.source_url === 'string' && story.source_url.startsWith('https://')) {
          const link = element('a', 'Original source ↗');
          link.href = story.source_url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          article.append(link);
        }
        section.append(article);
      });
      feed.append(section);
    }
  } catch (error) {
    feed.replaceChildren(element('p', 'Unable to load news right now.'));
    console.error(error);
  }
})();
