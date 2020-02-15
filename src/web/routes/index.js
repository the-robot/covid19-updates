const express = require('express');
const router = express.Router();

const routes = require('./urls');

// Dashboard
router.get(routes.index, (req, res, next) => {
  const lineData = [
    {
      name: 'Page A', count: 2400, amt: 2400,
    },
    {
      name: 'Page B', count: 1398, amt: 2210,
    },
    {
      name: 'Page C', count: 9800, amt: 2290,
    },
    {
      name: 'Page D', count: 3908, amt: 2000,
    },
    {
      name: 'Page E', count: 4800, amt: 2181,
    },
    {
      name: 'Page F', count: 3800, amt: 2500,
    },
    {
      name: 'Page G', count: 4300, amt: 2100,
    },
  ];
  
  const barData = [
    {
      name: 'Page A', infection: 4000, death: 2400, amt: 2400,
    },
    {
      name: 'Page B', infection: 3000, death: 1398, amt: 2210,
    },
    {
      name: 'Page C', infection: 2000, death: 9800, amt: 2290,
    },
    {
      name: 'Page D', infection: 2780, death: 3908, amt: 2000,
    },
    {
      name: 'Page E', infection: 1890, death: 4800, amt: 2181,
    },
    {
      name: 'Page F', infection: 2390, death: 3800, amt: 2500,
    },
    {
      name: 'Page G', infection: 3490, death: 4300, amt: 2100,
    },
  ];

  const fakeData = [
    {
      "id": 1,
      "firstName": "Ernest",
      "count": 820,
    },
    {
      "id": 2,
      "firstName": "Ernest",
      "count": 820,
    },
  ];

  const props = {
    title: 'COVID-19 - Dashboard',

    // TODO: pull data from mongo
    // Overall Data
    overviewData: {
      cases: 60379,
      deaths: 1369,
      recovered: 6079,
    },

    // Graph Data
    infectionsGraphData: lineData,
    deathsGraphData: lineData,
    recoveredGraphData: lineData,
    infectionsDeathsGraphData: barData,

    // Table Data
    infectionsTableData: [
      {
        "id": 1,
        "firstName": "Ernest",
        "count": 820,
      },
      {
        "id": 2,
        "firstName": "Ernest",
        "count": 820,
      },
    ],
    deathsTableData: fakeData,
  };

  res.render('home', props);
});

// News
router.get(routes.news, (req, res, next) => {
  res.render('news', { title: 'COVID-19 - News' });
});

// Prevention
router.get(routes.prevention, (req, res, next) => {
  res.render('prevention', { title: 'COVID-19 - Prevention' });
});

// About
router.get(routes.about, (req, res, next) => {
  res.render('about', { title: 'COVID-19 - About' });
});

module.exports = { router, routes};
