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
  type MyMovie {
    id: ID!
    title: String!
    genre: Genre!
  }
  type Movie {
    id: ID!
    url: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }
  type Query {
    allMovies: [Movie!]!
    allGenres: [Genre!]!
    allMyMovies: [MyMovie!]!
    movie(id: ID!): MyMovie
  }
  type Mutation {
    postMovie(title: String!, genreId: ID!): MyMovie!
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
  MyMovie: {
    genre({ genreId }) {
      return genres.find((genre) => genre.id === genreId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
