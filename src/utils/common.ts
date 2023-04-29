import { plainToInstance } from 'class-transformer';
import crypto from 'crypto';
import { Movie } from '../types/movie.type.js';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createMovie = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    titleMovie,
    description,
    publicationDate,
    genreMovie,
    releaseYear,
    rating,
    moviePreviewLink,
    movieVideoLink,
    actors,
    director,
    duration,
    poster,
    comments,
    userName,
    email,
    avatar,
    password,
    backgroundImage,
    backgroundColor
  ] = tokens;

  return {
    titleMovie,
    description,
    publicationDate: new Date(publicationDate),
    genreMovie,
    releaseYear: Number(releaseYear),
    rating: Number(rating),
    moviePreviewLink,
    movieVideoLink,
    actors: actors.split('; ').map((actor) => (actor)),
    director,
    duration: Number(duration),
    poster: poster,
    comments: Number(comments),
    user: { userName, email, avatar, password },
    backgroundImage: backgroundImage,
    backgroundColor: backgroundColor,
  } as Movie;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});
