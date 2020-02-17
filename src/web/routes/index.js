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
  // get overall cases data
  const overallRecords = await db.getOverallCases();
  // get cases & deaths by country
  const countriesCasesData = await db.getCountriesLastestCases();

  // build prop for view
  const props = {
    title: 'COVID-19 - Dashboard',
    overallRecords,
    countriesCasesData,
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
