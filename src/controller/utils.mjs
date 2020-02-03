import rssParser from 'rss-parser';

const isAboutVirus = text => {
  // to check if the text is about wuhan/corona virus
  return (
    new RegExp('wuhan', 'ig').test(text) ||
    new RegExp('coronavirus', 'ig').test(text) ||
    new RegExp('corona virus', 'ig').test(text)
  );
};

// RSS parser
const getRssFeeds = async rss_sources => {
  const articles = [];
  // rss parser
  const parser = new rssParser();

  for (let index in rss_sources) {
    let source = rss_sources[index];
    let feeds = await parser.parseURL(source.url);

    feeds.items.forEach(item => {
      if (isAboutVirus(item.title) || isAboutVirus(item.link)) {
        item.articleSource = {
          short_name: source.short_name,
          name: source.name
        };
        articles.push(item)
      }
    });
  };
  return articles;
};

const sortArticleByOldest = (a, b) => {
  if (a.isoDate > b.isoDate) return 1;
  if (b.isoDate > a.isoDate) return -1;
  return 0;
};

export { getRssFeeds, sortArticleByOldest };
