import { User } from './user.type.js';

export type Movie = {
  titleMovie: string;
  description: string;
  publicationDate: Date;
  genreMovie: string;
  releaseYear: number;
  rating: number;
  moviePreviewLink: string;
  movieVideoLink: string;
  actors: string[];
  director: string;
  duration: number;
  poster: string;
  commentsCount: number;
  user: User;
  backgroundImage: string;
  backgroundColor: string;
}
