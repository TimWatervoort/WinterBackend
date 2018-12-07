const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  const theDate = new Date().toString().split(' ')[1];
  const months = ['Dec', 'Jan', 'Feb'];
  let response;
  if (months.includes(theDate)){
    response = 'Yes.'
  } else {
    response = 'No.'
  }
  res.send(response);
});

module.exports = router;
