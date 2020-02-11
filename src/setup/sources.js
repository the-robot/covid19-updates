// News Sources
const NEWS_RSS = {
  bbc: {
    short_name: 'BBC',
    name: 'British Broadcasting Corporation',
    url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
  },
  cna: {
    short_name: 'CNA',
    name: 'Channel News Asia',
    url: 'https://www.channelnewsasia.com/rssfeeds/8395986'
  },
  cnbc: {
    short_name: 'CNBC',
    name: 'Consumer News and Business Channel',
    url: 'https://www.cnbc.com/id/100727362/device/rss/rss.html',
  },
  cnn: {
    short_name: 'CNN',
    name: 'Cable News Network',
    url: 'http://rss.cnn.com/rss/edition.rss',
  },
  guardian: {
    short_name: 'The Guardian',
    name: 'The Guardian',
    url: 'https://www.theguardian.com/world/rss'
  },
//   mail_online: {
//     short_name: 'Mail Online',
//     name: 'Mail Online',
//     url: 'https://www.dailymail.co.uk/articles.rss',
//   },
  ny_times: {
    short_name: 'New York Times',
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  },
  rfa: {
    short_name: 'RFA',
    name: 'Radio Free Asia',
    url: 'https://www.rfa.org/english/feed/rss2.xml',
  },
  strait_times: {
    short_name: 'Strait Times',
    name: 'Strait Times',
    url: 'https://www.straitstimes.com/news/asia/rss.xml'
  },
  the_independent: {
    short_name: 'The Independent',
    name: 'The Independent',
    url: 'http://www.independent.co.uk/news/world/rss',
  },
  yahoo: {
    short_name: 'Yahoo Singapore',
    name: 'Yahoo Singapore',
    url: 'https://sg.news.yahoo.com/rss/'
  },
};

// Reddit RSS
const REDDIT_RSS = {
  china: {
    short_name: 'r/china',
    name: 'China',
    url: 'https://www.reddit.com/r/China/.rss',
  },
  china_flu: {
    short_name: 'r/china_flu',
    name: 'China Flu',
    url: 'https://www.reddit.com/r/china_flu/.rss',
  },
  coronavirus: {
    short_name: 'r/coronavirus',
    name: 'Coronavirus',
    url: 'https://www.reddit.com/r/coronavirus/.rss',
  },
  news: {
    short_name: 'r/news',
    name: 'Reddit News',
    url: 'https://www.reddit.com/r/news/.rss',
  },
  singapore: {
    short_name: 'r/singapore',
    name: 'Singapore',
    url: 'https://www.reddit.com/r/singapore/.rss',
  },
};

// Twitter username
const TWITTER_RSS = {
  wuhanvirus: {
    short_name: '@thewuhanvirus',
    name: 'the_wuhan_virus',
    url: 'https://twitrss.me/twitter_user_to_rss/?user=thewuhanvirus',
  },
};

export { NEWS_RSS, REDDIT_RSS, TWITTER_RSS };
