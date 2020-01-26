
module.exports = {
  client: "pg",
  connection: process.env.DB_UR || 'postres://rafael:sharck@localhost/movie_quotes',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: { directory: './seeds' }
};