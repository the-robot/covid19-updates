const express = require('express');
const router = express.Router();

const routes = require('./urls');

// Dashboard
router.get(routes.index, (req, res, next) => {
  res.render('index', { title: 'COVID-19 - Dashboard' });
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
