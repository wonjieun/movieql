import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Genre {
    id: ID
    name: String
  }
  type Movie {
    id: ID!
    title: String!
    genre: Genre!
  }
  type Query {
    allMovies: [Movie!]!
    movie(id: ID!): Movie
  }
  type Mutation {
    postMovie(title: String!, genre: ID!): Movie!
    deleteMovie(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    movie() {
      console.log("I'm called");
      return null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
