
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('quotes').del()
    .then(function () {
      // Inserts seed entries
      return knex('quotes').insert([
        {id: 1, quote: 'hi', movie: 'The movie', year: '2020'},
        // {id: 2, movie: 'movie'},
        // {id: 3, year: 'now'}
      ]);
    });
};
