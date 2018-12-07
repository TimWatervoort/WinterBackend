const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('categories')
  .then(result => {
    res.send(result)
  });
});

const checkId = (req, res, next) => {
  knex('categories')
  .where('id', req.params.id)
  .then(result => {
    if (result.length === 0) {
      res.send({
        error: {
          message: 'Category not found!'
        }
      })
    } else {
      next();
    }
  })
}

router.get('/:id', checkId, (req, res, next) => {
  knex('excuses_categories')
  .where('category_id', req.params.id)
  .then(result => {
    return Promise.all(result.map(x=> {
      return knex('excuses')
      .where('id', x.excuse_id)
    }))
    .then(result => {
      const sending = [];
      result.forEach(x => sending.push(...x))
      res.send(sending)
    });
  });
});

router.post('/', (req, res, next) => {
  const newCat = {
    name: req.body.name
  }
  knex('categories')
  .insert(newCat)
  .returning('*')
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    next(err);
  });
});

router.put('/:id', checkId, (req, res, next) => {
  const updateCategory = {
    name: req.body.name
  }
  knex('categories')
  .where('id', req.params.id)
  .returning('*')
  .update(updateCategory)
  .then(result => {
    res.send(result);
  })
})


router.delete('/:id', checkId, (req, res, next) => {
  knex('categories')
  .where('id', req.params.id)
  .returning('*')
  .del()
  .then(result => {
    res.send(result);
  });
});

module.exports = router;
