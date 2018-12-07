exports.up = function(knex, Promise) {
  return knex.schema.createTable('excuses_categories', table => {
    table.increments();
    table.integer('excuse_id');
    table.foreign('excuse_id').references('excuses.id').onDelete('CASCADE')

    table.integer('category_id');
    table.foreign('category_id').references('categories.id').onDelete('CASCADE')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('excuses_categories');
};
