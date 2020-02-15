const express = require('express');
const router = express.Router();

const routes = require('./urls');

// Database
const db = require('../../db');

// Dashboard
router.get(routes.index, async (req, res, next) => {
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


  // get overview data
  const overallRecords = await db.getOverallCases();
  const overviewData = {
    cases: overallRecords[0].cases,
    deaths: overallRecords[0].deaths,
    recovered: overallRecords[0].cured,
  };

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
    infectionsGraphData: lineData,
    deathsGraphData: lineData,
    recoveredGraphData: lineData,
    infectionsDeathsGraphData: barData,

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

module.exports = { router, routes};
