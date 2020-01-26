
exports.up = function(knex) {
  return knex.schema.createTable('quotes', (t) => {
      t.increments() // auto-incrementing id column
      .index() // index this column

      t.string("quote")
      .notNullable()
      .index()

      t.string("movie")

      t.string("year")
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("quotes");
};
