import crypto from 'crypto';

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
    commentsCount,
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
    actors: actors.split('; '),
    director,
    duration: Number(duration),
    poster: poster,
    commentsCount: Number(commentsCount),
    user: { userName, email, avatar, password },
    backgroundImage: backgroundImage,
    backgroundColor: backgroundColor,
  };
};

export const getErrorMessage = (error: Error | string): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
