
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('excuses_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('excuses_categories').insert([
        {id: 1, excuse_id: 1, category_id: 4},
        {id: 2, excuse_id: 2, category_id: 2},
        {id: 3, excuse_id: 3, category_id: 5},
        {id: 4, excuse_id: 4, category_id: 2}
      ])
      .then(function() {
      return knex.raw(`SELECT setval('excuses_categories_id_seq', (SELECT MAX(id) FROM excuses_categories))`)
      })
    });
};
