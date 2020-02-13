const express = require('express');
const router = express.Router();

// Home
router.get('/', (req, res, next) => {
  res.render('index', { title: 'COVID-19 Monitor' });
});

module.exports = router;
