import mongodb from 'mongodb';

import { MONGO_CONFIG } from '../config';
import {
  // sources
  getNewsSources,
  getRedditSources,
  getTweetSources,
  getTelegramChannels,

  // get data
  getCountries,
  getOverallCases,
  getCasesByCountry,
  getCountriesLastestCases,
  getNews,
  getRedditPosts,
  getTweets,

  // insertion
  insertCoronaCase,
  insertDailyCoronaCases,
  insertCountryIfNotExists,
  insertNewsIfNotExists,
  insertRedditIfNotExists,
  insertTweetIfNotExists,

  // update
  updateCountryCase,
} from './facade';

const getDb = () => {
  const { protocol, host, port, username, password, db } = MONGO_CONFIG;
  return new mongodb.MongoClient(
    `${protocol}://${username}:${password}@${host}:${port}/${db}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

export {
  getDb,

  // sources
  getNewsSources,
  getRedditSources,
  getTweetSources,
  getTelegramChannels,

  // get data
  getCountries,
  getOverallCases,
  getCasesByCountry,
  getCountriesLastestCases,
  getNews,
  getRedditPosts,
  getTweets,

  // insertion
  insertCoronaCase,
  insertDailyCoronaCases,
  insertCountryIfNotExists,
  insertNewsIfNotExists,
  insertRedditIfNotExists,
  insertTweetIfNotExists,

  // update
  updateCountryCase,
};
