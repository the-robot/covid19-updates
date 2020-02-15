const express = require('express');
const moment = require('moment');
const router = express.Router();

const utils = require('../views/utils');

// routes
const routes = require('./urls');

// Database
const db = require('../../db');
const PAGINATION_SIZE = 20;


// Dashboard
router.get(routes.index, async (req, res, next) => {
   // get overview data
  const overallRecordsByLatest = await db.getOverallCases(byLatest=true);
  const overviewData = {
    cases: overallRecordsByLatest[0].cases,
    deaths: overallRecordsByLatest[0].deaths,
    recovered: overallRecordsByLatest[0].cured,
  };

  const overallRecordsByEarliest = await db.getOverallCases();
  const infectionsGraphData = [];
  const deathsGraphData = [];
  const recoveredGraphData = [];
  const infectionsDeathsGraphData = [];
  for (let i=0; i<overallRecordsByEarliest.length; i++) {
    let record = overallRecordsByEarliest[i];
    let date = moment(record.added_date)
      .subtract(1, 'days')
      .format('DD-MM-YYYY');

    // build graph data
    infectionsGraphData.push({ name: date, count: record.cases });
    deathsGraphData.push({ name: date, count: record.deaths });
    recoveredGraphData.push({ name: date, count: record.cured || 0 });
    infectionsDeathsGraphData.push({
      name: date,
      infection: record.cases,
      death: record.deaths,
    });
  }


  // get cases & deaths by country
  const countries = await db.getCountries();
  const infectionsTableData = [];
  const deathsTableData = [];
  for (let i=0; i<countries.length; i++) {
    let countryCases  = await db.getCasesByCountry(countries[i].name);
    infectionsTableData.push({
      "id": i + 1,
      "country": countries[i].name,
      "count": countryCases[0].cases,
    });
    deathsTableData.push({
      "id": i + 1,
      "country": countries[i].name,
      "count": countryCases[0].deaths,
    });
  }
  // sort by count
  infectionsTableData.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    if (b.count > a.count) {
        return 1;
    }
    return 0;
  });
  deathsTableData.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    if (b.count > a.count) {
        return 1;
    }
    return 0;
  });


  // build prop for view
  const props = {
    title: 'COVID-19 - Dashboard',

    // Overall Data
    overviewData,

    // Graph Data
    infectionsGraphData,
    deathsGraphData,
    recoveredGraphData,
    infectionsDeathsGraphData,

    // Table Data
    infectionsTableData,
    deathsTableData,
  };

  res.render('home', props);
});

// News
router.get(routes.news, (req, res, next) => {
  res.render('news', { title: 'COVID-19 - News' });
});

// About
router.get(routes.about, (req, res, next) => {
  res.render('about', { title: 'COVID-19 - About' });
});


// API Endpoints
router.get(`${routes.api.news}:page/`, async (req, res, next) => {
  let { page } = req.params;
  // if page number is invalid, return 400
  if (!page || !utils.isNumber(page)) {
    res.status(400).json({'error': 'invalid page number'});
    return;
  }
  page = parseInt(page, 10);

  const totalRecords = (await db.getNews()).length;
  const newsData = await db.getNews(page * PAGINATION_SIZE, PAGINATION_SIZE);
  const news = [];
  for (let i=0; i<newsData.length; i++) {
    news.push({
      title: newsData[i].title,
      link: newsData[i].link,
      author: newsData[i].articleSource.name,
      date: moment(newsData[i].isoDate).format('DD-MM-YYYY HH:mm'),
    });
  }

  res.status(200).json({
    data: news,
    page: page,
    total_pages: Math.ceil(totalRecords / parseFloat(PAGINATION_SIZE)) - 1,
  });
});

router.get(`${routes.api.reddit}:page/`, async (req, res, next) => {
  let { page } = req.params;
  // if page number is invalid, return 400
  if (!page || !utils.isNumber(page)) {
    res.status(400).json({'error': 'invalid page number'});
    return;
  }
  page = parseInt(page, 10);

  const totalRecords = (await db.getRedditPosts()).length;
  const redditPostsData = await db.getRedditPosts(page * PAGINATION_SIZE, PAGINATION_SIZE);
  const posts = [];
  for (let i=0; i<redditPostsData.length; i++) {
    posts.push({
      title: redditPostsData[i].title,
      link: redditPostsData[i].link,
      author: redditPostsData[i].articleSource.name,
      date: moment(redditPostsData[i].isoDate).format('DD-MM-YYYY HH:mm'),
    });
  }

  res.status(200).json({
    data: posts,
    page: page,
    total_pages: Math.ceil(totalRecords / parseFloat(PAGINATION_SIZE)) -1,
  });
});

router.get(`${routes.api.tweets}:page/`, async (req, res, next) => {
  let { page } = req.params;
  // if page number is invalid, return 400
  if (!page || !utils.isNumber(page)) {
    res.status(400).json({'error': 'invalid page number'});
    return;
  }
  page = parseInt(page, 10);

  const totalRecords = (await db.getTweets()).length;
  const tweetsData = await db.getTweets(page * PAGINATION_SIZE, PAGINATION_SIZE);
  const tweets = [];
  for (let i=0; i<tweetsData.length; i++) {
    tweets.push({
      title: tweetsData[i].title,
      link: tweetsData[i].link,
      author: tweetsData[i].articleSource.name,
      date: moment(tweetsData[i].isoDate).format('DD-MM-YYYY HH:mm'),
    });
  }

  res.status(200).json({
    data: tweets,
    page: page,
    total_pages: Math.ceil(totalRecords / parseFloat(PAGINATION_SIZE)) - 1,
  });
});

module.exports = { router, routes};
