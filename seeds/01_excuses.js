
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('excuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('excuses').insert([
        {id: 1, excuse: 'Grandma died, it was too cold.'},
        {id: 2, excuse: 'I\'m feeling a cold coming on.'},
        {id: 3, excuse: 'I\'m from Florida, it\'s too cold for me.'},
        {id: 4, excuse: 'My cough is just so bad right now.'}
      ])
      .then(function() {
      return knex.raw(`SELECT setval('excuses_id_seq', (SELECT MAX(id) FROM excuses))`)
      })
    });
};
