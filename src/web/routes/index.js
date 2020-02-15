const express = require('express');
const moment = require('moment');
const router = express.Router();

// routes
const routes = require('./urls');

// Database
const db = require('../../db');

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

module.exports = { router, routes};
