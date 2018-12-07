const express = require('express');
const router = express.Router();
const knex = require('../knex');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  knex('excuses').then(result => {
    res.send(result);
  })
});

const checkId = (req, res, next) => {
  knex('excuses')
  .where('id', req.params.id)
  .then(result => {
    if (result.length === 0) {
      res.send({
        error: {
          message: 'Excuse not found!'
        }
      })
    } else {
      next();
    }
  })
}

router.get('/excuse/:id', checkId, (req, res, next) => {
  knex('excuses')
  .where('id', req.params.id)
  .then(result => {
    res.send(result);
  });
})

router.get('/random', (req, res, next) => {
  knex('excuses')
  .then(result => {
    const limit = result.length;
    let selection = Math.ceil(Math.random() * limit);
    if (selection === 0) {
      selection++;
    }
    knex('excuses')
    .where('id', selection)
    .then(result => {
      res.send(result);
    })
  })
})

router.post('/', (req, res, next) => {
  const newExcuse = {
    excuse: req.body.excuse
  };
  knex('excuses')
  .insert(newExcuse)
  .returning('*')
  .then(result => {
    const toSend = result[0];
    const newPost = {
      category_id: req.body.category,
      excuse_id: toSend.id
    }
    knex('excuses_categories')
    .insert(newPost)
    .then(result => {
      res.send(toSend);
    })
  });
})

router.delete('/excuse/:id', checkId, (req, res, next) => {
  knex('excuses')
  .where('id', req.params.id)
  .returning('*')
  .del()
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;
