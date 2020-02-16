// credentials
const BOT_TOKEN = '';
const BOT_USERNAME = 'coronaexe_bot';

const MONGO_CONFIG = {
  protocol: 'mongodb',
  host: 'localhost',
  port: '27017',
  db: 'coronadb',
  username: 'username',
  password: 'password',

  collections: {
    dailyOverall: 'daily_overall',
    cases: 'cases',
    countries: 'countries',
    countries_latest_cases: 'countries_latest_cases',
    news: 'news',
    newsSource: 'news_source',
    reddit: 'reddit',
    redditSource: 'reddit_source',
    tweets: 'tweets',
    tweetSource: 'tweets_source',

    // telegram
    telegramChannels: 'telegram_channels',
  },
};

export { BOT_TOKEN, BOT_USERNAME, MONGO_CONFIG };

