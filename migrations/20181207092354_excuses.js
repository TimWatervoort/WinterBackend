exports.up = function(knex, Promise) {
  return knex.schema.createTable('excuses', table => {
    table.increments();
    table.string('excuse').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('excuses');
};
