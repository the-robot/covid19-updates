import axios from 'axios';
import cheerio from 'cheerio';

import {
  getNewsSources,
  getRedditSources,
  getTweetSources,
  getNews,
  getRedditPosts,
  getTweets,
} from '../db';
import { getRssFeeds, sortArticleByOldest } from './utils';

// Statistic Data URL
const CORONA_METER = {
  url: 'https://www.worldometers.info/coronavirus/',
};

const getCoronaCountries = async () => {
  let response;
  try {
    response = await axios.get(CORONA_METER.url);
    if (response.status !== 200) {
      throw err;
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  // get HTML and parse death rates
  const html = cheerio.load(response.data)
  const countriesTable = html('table#table3');
  const countriesTableCells = countriesTable.children('tbody').children('tr').children('td');

  // NOTE: this will change when table format change in website
  const totalColumns = 8;
  const countryColIndex = 0;
  const casesColIndex = 1;
  const todayCasesColIndex = 2;
  const deathsColIndex = 3;
  const todayDeathsColIndex = 4;
  const curedColIndex = 5;
  const criticalColIndex = 6;
  const regionColIndex = 7;

  for (let i=0; i<countriesTableCells.length; i+=1) {
    const cell = countriesTableCells[i];

    // get country
    if (i % totalColumns === countryColIndex) {
      let country = (
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // country name with link has another level
        cell.children[0].children[0].children[0].data ||
        ''
      );
      result.push({ country: country.trim() || '' });
    }
    // get cases
    if (i % totalColumns === casesColIndex) {
      let cases = cell.children[0].data || '';
      result[result.length-1].cases = parseInt(cases.trim().replace(/,/g, "") || '0', 10);
    }
    // get today cases
    if (i % totalColumns === todayCasesColIndex) {
      let cases = cell.children[0].data || '';
      result[result.length-1].todayCases = parseInt(cases.trim().replace(/,/g, "") || '0', 10);
    }
    // get deaths
    if (i % totalColumns === deathsColIndex) {
      let deaths = cell.children[0].data || '';
      result[result.length-1].deaths = parseInt(deaths.trim().replace(/,/g, "") || '0', 10);
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColIndex) {
      let deaths = cell.children[0].data || '';
      result[result.length-1].todayDeaths = parseInt(deaths.trim().replace(/,/g, "") || '0', 10);
    }
    // get cured
    if (i % totalColumns === curedColIndex) {
      let cured = cell.children[0].data || '';
      result[result.length-1].cured = parseInt(cured.trim().replace(/,/g, "") || '0', 10);
    }
    // get critical
    if (i % totalColumns === criticalColIndex) {
      let critical = cell.children[0].data || '';
      result[result.length-1].critical = parseInt(critical.trim().replace(/,/g, "") || '0', 10);
    }
    // get region
    if (i % totalColumns === regionColIndex) {
      let region = (
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        cell.children[0].children[0].children[0].data ||
        ''
      );
      result[result.length-1].region = region.trim() || '';
    }
  }

  return result;
};

const getCoronaOverall = async () => {
  let response;
  try {
    response = await axios.get(CORONA_METER.url);
    if (response.status !== 200) {
      throw err;
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = {};

  // get HTML and parse death rates
  const html = cheerio.load(response.data)
  html('.maincounter-number').filter((i, el) => {
    let count = el.children[0].next.children[0].data || '0';
    count = parseInt(count.replace(/,/g, "") || '0', 10);
    // first one is 
    if (i === 0) {
      result.cases = count;
    } else if (i === 1) {
      result.deaths = count;
    } else {
      result.cured = count;
    }
  });

  return result;
};

// RSS
const getNewsFromRss = async () => {
  const sources = await getNewsSources();
  const news = await getRssFeeds(sources);
  return news.sort(sortArticleByOldest);
};

const getRedditPostsFromRss = async () => {
  const sources = await getRedditSources();
  const posts = await getRssFeeds(sources);
  return posts.sort(sortArticleByOldest);
};

const getTwitterPostsFromRss = async () => {
  const sources = await getTweetSources();
  const posts = await getRssFeeds(sources);
  return posts.sort(sortArticleByOldest);
};

// From Mongo
const getLatestNews = async (offset=0, size=10) => {
  const news = await getNews(offset, size);
  return news;
};

const getLatestRedditPosts = async (offset=0, size=10) => {
  const posts = await getRedditPosts(offset, size);
  return posts;
};

const getLatestTweets = async (offset=0, size=10) => {
  const tweets = await getTweets(offset, size);
  return tweets;
};

export {
  getCoronaCountries,
  getCoronaOverall,

  // from RSS
  getNewsFromRss,
  getRedditPostsFromRss,
  getTwitterPostsFromRss,

  // from Mongo
  getLatestNews,
  getLatestRedditPosts,
  getLatestTweets,
};
