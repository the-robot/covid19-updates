import React from 'react';
import ReactDOM from 'react-dom';

// Dynamic Components
// mobile navbar
import Topbar from '../Layout/Topbar.jsx';

// home
import Overviews from './Home/Overviews.jsx';
import CasesTable from './Home/CasesTable.jsx';
import Graphs from './Home/Graphs.jsx';

// news
import NewsFeed from './News/NewsFeed.jsx';
import Reddit from './News/Reddit.jsx';
import Tweets from './News/Tweets.jsx';


module.exports = data => {
  // layout mobile topbar
  const layoutMobileNavbar = document.getElementById('layout-mobile-navbar');
  if (layoutMobileNavbar) {
    ReactDOM.hydrate(
      <Topbar {...data} />,
      layoutMobileNavbar
    );
  }

  // views/home.jsx
  const homeOverviews = document.getElementById('home-overviews');
  const homeGraphs = document.getElementById('home-graphs');
  const homeCasesTable = document.getElementById('home-cases-tables');
  if (homeOverviews) {
    ReactDOM.hydrate(
      <Overviews {...data} />,
      homeOverviews
    );
  }
  if (homeGraphs) {
    ReactDOM.hydrate(
      <Graphs {...data} />,
      homeGraphs
    );
  }
  if (homeCasesTable) {
    ReactDOM.hydrate(
      <CasesTable {...data} />,
      homeCasesTable
    );
  }

  // views/news.jsx
  const newsNewsFeed = document.getElementById('news-newsfeed');
  const newsReddit = document.getElementById('news-reddit');
  const newsTweets = document.getElementById('news-tweets');
  if (newsNewsFeed) {
    ReactDOM.hydrate(
      <NewsFeed {...data} />,
      newsNewsFeed
    );
  }
  if (newsReddit) {
    ReactDOM.hydrate(
      <Reddit {...data} />,
      newsReddit
    );
  }
  if (newsTweets) {
    ReactDOM.hydrate(
      <Tweets {...data} />,
      newsTweets
    );
  }
};
