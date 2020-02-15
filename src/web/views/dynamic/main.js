import React from 'react';
import ReactDOM from 'react-dom';

// Dynamic Components
// home
import CasesTable from './Home/CasesTable.jsx';
import Graphs from './Home/Graphs.jsx';

// news
import NewsFeed from './News/NewsFeed.jsx';
import Reddit from './News/Reddit.jsx';
import Tweets from './News/Tweets.jsx';


module.exports = data => {
  // views/home.jsx
  const homeGraphs = document.getElementById('home-graphs');
  const homeCasesTable = document.getElementById('home-cases-tables');
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
