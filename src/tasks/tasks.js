import { sendMessage } from '../bot';
import {
  getTelegramChannels,
  insertCoronaCase,
  insertDailyCoronaCases,
  insertCountryIfNotExists,
  insertNewsIfNotExists,
  insertRedditIfNotExists,
  insertTweetIfNotExists,
  updateCountryCase,
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
    // store individual country lastest update data
    await updateCountryCase(document);
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
  let message = `<b>Infections & Deaths Update</b>\n`;
  message += `Cases: ${overall.cases}\n`;
  message += `Deaths: ${overall.deaths}\n`;
  message += `Recovered: ${overall.cured}\n`;

  // send broadcast message to subscribed channels
  for (let i=0; i < channels.length; i++) {
    sendMessage(channels[i].name, message, {parse_mode : "HTML"});
  }
};

const broadcastCountryCases = async () => {
  const buildInHtml = countries => {
    let reply = `<b>Confirmed Cases & Deaths</b>\n\n`;

    for (let i=0; i<countries.length; i+=1) {
      reply += `<i><b>${i+1}. ${countries[i].country}</b></i> (${countries[i].region})\n`;
      reply += `Cases: ${countries[i].cases}\n`;
      // reply += parseInt(countries[i].todayCases) > 0
      //   ? `New Cases: ${countries[i].todayCases}\n`
      //   : '';
      reply += parseInt(countries[i].deaths) > 0
        ? `Deaths: ${countries[i].deaths}\n`
        : '';
      // reply += parseInt(countries[i].todayDeaths) > 0
      //   ? `New Deaths: ${countries[i].todayDeaths}\n`
      //   : '';
      reply += parseInt(countries[i].cured) > 0
        ? `Recovered: ${countries[i].cured}\n`
        : '';
      reply += parseInt(countries[i].critical) > 0
        ? `Critical: ${countries[i].critical}\n\n`
        : '\n';
    }

    reply += `<pre>Total ${countries.length} countries with confirmed cases and deaths.</pre>`;
    return reply;
  };

  const channels = await getTelegramChannels();
  if (!channels || channels.length === 0) {
    return;
  }
  const countries = await getCoronaCountries();
  if (!countries || countries.length === 0) {
    return;
  }

  const message = buildInHtml(countries);
  // send broadcast message to subscribed channels
  for (let i=0; i < channels.length; i++) {
    sendMessage(channels[i].name, message, {parse_mode : "HTML"});
  }
}

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
  broadcastCountryCases,
};
