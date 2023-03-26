import { MovieGeneratorInterface } from './movie-generator-interface.js';
import { mockData } from '../../types/mock-data.type.js';
import { getRandomItem, getRandomItems, generateRandomValue, generateRandomPassword } from '../../utils/random.js';
import dayjs from 'dayjs';
import { genreMovies } from '../../types/movie-genre.enum.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 0;
const MAX_RATING = 100;
const NUM_AFTER_DIGIT = 0;

const MIN_RELEASE_YEAR = 1900;
const MAX_RELEASE_YEAR = 2023;

const MIN_DURATION = 60;
const MAX_DURATION = 300;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 1000;

export default class MovieGenerator implements MovieGeneratorInterface {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  constructor(private readonly mockData: mockData) { }

  public generate(): string {
    const titleMovie = getRandomItem<string>(this.mockData.titlesMovie);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genreMovie = getRandomItems<string>(Object.values(genreMovies)).join('; ');
    const releaseYear = generateRandomValue(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, NUM_AFTER_DIGIT);
    const moviePreviewLink = getRandomItem<string>(this.mockData.moviePreviewsLink);
    const movieVideoLink = getRandomItem<string>(this.mockData.movieVideosLink);
    const actors = getRandomItems<string>(this.mockData.actors).join(', ');
    const directors = getRandomItem<string>(this.mockData.directors);
    const duration = generateRandomValue(MIN_DURATION, MAX_DURATION);
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const userName = getRandomItem<string>(this.mockData.usersName);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = generateRandomPassword();
    const poster = getRandomItem<string>(this.mockData.posters);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);

    return [
      titleMovie,
      description,
      publicationDate,
      genreMovie,
      releaseYear,
      rating,
      moviePreviewLink,
      movieVideoLink,
      actors,
      directors,
      duration,
      commentsCount,
      userName,
      email,
      avatar,
      password,
      poster,
      backgroundColor,
      backgroundImage
    ].join('\t');
  }
}

