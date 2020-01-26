const { ApolloServer, gql } = require('apollo-server');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING || 'postres://rafael:sharck@localhost/movie_quotes',
  searchPath: ['knex', 'public'],
});

const typeDefs = gql`
  type Quote {
    id: ID
    quote: String
    movie: String
    year: Int
  }

  type Query {
    quotes: [Quote]
  }

  type Mutation {
    addQuote(quote: String!, movie: String, year: String): Quote
    editQuote(id: ID!, quote: String, movie: String, year: String): Quote
    deleteQuote(id: ID!): DeleteResponse
  }

  type DeleteResponse {
    ok: Boolean
  }
`;

const resolvers = {
    Query: {
        quotes: () => 
    {
      return knex('quotes')
      .select()
      .then((quotes) =>{
        return quotes
        }) 

    }
      },
    Mutation: {
      addQuote: async (parent, quote) => {
        return knex('quotes')
        .insert({
          quote: quote.quote,
          movie: quote.movie,
          year: quote.year
        }).then(quote => quote)

      },
      editQuote: async (parent, { id, ...quote }) => {
        return knex('quotes')
        .where('id', '=', id)
        .update({
          quote: quote.quote,
          movie: quote.movie,
          year: quote.year
        })
      },
      deleteQuote: async (parent, { id }) => {
        return knex('quotes')
        .del()
        .where('id', '=', id)
      },
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
});
