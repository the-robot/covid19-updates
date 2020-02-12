import { sendMessage } from '../bot';
import {
  getTelegramChannels,
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


// Data Pulling Tasks
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

const pullNewsAndBroadcast = async () => {
  const news = await getNewsFromRss();
  news.forEach(async document => {
    delete document.categories;
    const added = await insertNewsIfNotExists(document);
    // if added means have not broadcasted, so broadcast
    if (added) {
      broadcastLatestNews(document);
    }
  });
};


// Broadcasting Tasks
const boradcastCasesOverview = async () => {
  const channels = await getTelegramChannels();
  if (!channels || channels.length === 0) {
    return;
  }

  const overall = await getCoronaOverall();
  let message = `<b>Cases</b>: ${overall.cases}\n`;
  message += `<b>Deaths</b>: ${overall.deaths}\n`;
  message += `<b>Recovered</b>: ${overall.cured}\n`;

  // send broadcast message to subscribed channels
  for (let i=0; i < channels.length; i++) {
    sendMessage(channels[i].name, message, {parse_mode : "HTML"});
  }
};

const broadcastLatestNews = async (news) => {
  const message = `<a href="${news.link}">${news.title}</a> <code>(${news.articleSource.short_name})</code>\n\n`; 
  const channels = await getTelegramChannels();
  if (!channels || channels.length === 0) {
    return;
  }

  // send broadcast message to subscribed channels
  for (let i=0; i < channels.length; i++) {
    sendMessage(channels[i].name, message, {parse_mode : "HTML"});
  }
};


export {
  pullCoronaCasesData,
  pullCoronaOverallData,
  pullNewsAndBroadcast,
  pullReddit,
  pullTweets,
  boradcastCasesOverview,
};
