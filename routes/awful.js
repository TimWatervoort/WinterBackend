const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex.raw('DROP TABLE excuses_categories;')
  .then(result => {
    res.send('Why did you do that?')
  });
});

module.exports = router;
