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

// const quotes = {};
// const addQuote = quote => {
//   const id = uuid();
//   return quotes[id] = { ...quote, id };
// };

// Start with a few initial quotes
// addQuote({ quote: "I'm a leaf on the wind. Watch how I soar.", quotee: "Wash", year: 1999 });
// addQuote({ quote: "We're all stories in the end.", quotee: "The Doctor", year: 1234 });
// addQuote({ quote: "Woah!", quotee: "Neo", year: 1999 });


const resolvers = {
    Query: {
        quotes: () => // Object.values(quotes),
    {
      return knex('quotes')
      .select()
      .then((quotes) =>{
        console.log(quotes)
        return quotes
        }) 

    }
      },
    Mutation: {
      addQuote: async (parent, quote) => {
        //return addQuote(quote);
        return knex('quotes')
        .insert({
          quote: quote.quote,
          movie: quote.movie,
          year: quote.year
        })

      },
      editQuote: async (parent, { id, ...quote }) => {
        console.log(quote)
        return knex('quotes')
        .where('id', '=', id)
        .update({
          quote: quote.quote,
          movie: quote.movie,
          year: quote.year
        })
      },
      deleteQuote: async (parent, { id }) => {
        console.log(id)
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
