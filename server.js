import { ApolloServer, gql } from 'apollo-server';

let movies = [
  {
    id: '1',
    title: 'Doctor Strange in the Multiverse of Madness',
  },
  {
    id: '2',
    title: 'Thor: Love and Thunder',
  },
];

let genres = [
  {
    id: '1',
    name: 'Action',
  },
  {
    id: '2',
    name: 'Adventure',
  },
];

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String!
    tag: String!
  }
  type Movie {
    id: ID!
    title: String!
    genre: Genre!
  }
  type Query {
    allGenres: [Genre!]!
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
    allGenres() {
      return genres;
    },
    allMovies() {
      return movies;
    },
    movie(root, { id }) {
      return movies.find((movie) => movie.id === id);
    },
  },
  Mutation: {
    postMovie(_, { title, genre }) {
      const newMovie = {
        id: movies.length + 1,
        title,
      };
      movies.push(newMovie);
      return newMovie;
    },
    deleteMovie(_, { id }) {
      if (movies.findIndex((movie) => movie.id === id) < 0) {
        return false;
      }
      movies = movies.filter((movie) => movie.id !== id);
      return true;
    },
  },
  Genre: {
    tag({ name }) {
      return `#${name}`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
