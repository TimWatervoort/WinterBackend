exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'car'},
        {id: 2, name: 'sick'},
        {id: 3, name: 'religion'},
        {id: 4, name: 'death'},
        {id: 5, name: 'florida'},
        {id: 6, name: 'injured'}
      ])
      .then(function() {
      return knex.raw(`SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))`)
      })

    });
};
