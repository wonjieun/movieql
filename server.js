import { ApolloServer, gql } from 'apollo-server';

let movies = [
  {
    id: '1',
    title: 'Doctor Strange in the Multiverse of Madness',
    genreId: '1',
  },
  {
    id: '2',
    title: 'Thor: Love and Thunder',
    genreId: '2',
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
  """
  영화 장르
  """
  type Genre {
    id: ID!
    name: String!
    """
    해시태그(#) 장르
    """
    tag: String!
  }
  type Movie {
    id: ID!
    title: String!
    genre: Genre!
  }
  type Query {
    allGenres: [Genre!]!
    allMyMovies: [Movie!]!
    movie(id: ID!): Movie
  }
  type Mutation {
    postMovie(title: String!, genreId: ID!): Movie!
    deleteMovie(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allGenres() {
      return genres;
    },
    allMyMovies() {
      return movies;
    },
    movie(root, { id }) {
      return movies.find((movie) => movie.id === id);
    },
  },
  Mutation: {
    postMovie(_, { title, genreId }) {
      if (!genres.some((genre) => genre.id === genreId)) {
        throw new Error('genreId is not exist');
      }
      const newMovie = {
        id: movies.length + 1,
        title,
      };
      movies.push(newMovie);
      return newMovie;
    },
    deleteMovie(_, { id }) {
      if (!movies.some((movie) => movie.id === id)) {
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
  Movie: {
    genre({ genreId }) {
      return genres.find((genre) => genre.id === genreId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
