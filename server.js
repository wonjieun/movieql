import { ApolloServer, gql } from 'apollo-server';

const movies = [
  {
    id: '1',
    title: 'Doctor Strange in the Multiverse of Madness',
  },
  {
    id: '2',
    title: 'Thor: Love and Thunder',
  },
];

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
    allMovies() {
      return movies;
    },
    movie(root, { id }) {
      return movies.find((movie) => movie.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
