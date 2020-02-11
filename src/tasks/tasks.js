import {
  insertCoronaCase,
  insertDailyCoronaCases,
  insertCountryIfNotExists,
  insertNewsIfNotExists,
  insertRedditIfNotExists,
  insertTweetIfNotExists,
} from '../db';
import {
  getCoronaOverall,
  getCoronaCountries,
  getNewsFromRss,
  getRedditPostsFromRss,
  getTwitterPostsFromRss
} from '../controller';


const pullCoronaOverallData = async () => {
  const overall = await getCoronaOverall();
  await insertDailyCoronaCases(overall);
};

const pullCoronaCasesData = async () => {
  const countries = await getCoronaCountries();
  countries.forEach(async document => {
    // add affected country name
    await insertCountryIfNotExists(document.country);
    await insertCoronaCase(document);
  });
};

const pullNews = async () => {
  const news = await getNewsFromRss();
  news.forEach(async document => {
    delete document.categories;
    await insertNewsIfNotExists(document);
  });
};

const pullReddit = async () => {
  const posts = await getRedditPostsFromRss();
  posts.forEach(async document => {
    delete document.categories;
    await insertRedditIfNotExists(document);
  });
};

const pullTweets = async () => {
  const tweets = await getTwitterPostsFromRss();
  tweets.forEach(async document => {
    delete document.categories;
    await insertTweetIfNotExists(document);
  });
};

export { pullCoronaCasesData, pullCoronaOverallData, pullNews, pullReddit, pullTweets };
