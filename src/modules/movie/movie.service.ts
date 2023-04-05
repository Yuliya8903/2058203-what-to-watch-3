import { inject, injectable } from 'inversify';
import { MovieServiceInterface } from './movie-service.interface.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.type.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity.js';
import mongoose from 'mongoose';
import EditMovieDto from './dto/edit-movie.dto.js';
import { DEFAULT_MOVIE_COUNT, FILM_SHORT_FIELDS } from './movie.constant.js';
import { SortType } from '../../types/sort.type.js';

@injectable()
export default class MovieService implements MovieServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ) {}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>> {
    const result = await this.movieModel.create(dto);
    this.logger.info(`New movie created: ${dto.titleMovie}!`);

    return result;
  }

  public async findById(movieID: string): Promise<DocumentType<MovieEntity>[] | null> {
    return this.movieModel
      .aggregate([
        {
          $match: {'_id': new mongoose.Types.ObjectId(movieID)},
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'movieID',
            as: 'commentData'
          }
        },
        {
          $set:
          {rating: {$avg: '$commentData.rating'}, comments: { $size: '$commentData'}}
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userID',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $unset: 'user._id'
        },
      ]);
  }

  public async find(count?: number): Promise<DocumentType<MovieEntity>[]> {
    const limit = count ?? DEFAULT_MOVIE_COUNT;
    return this.movieModel
      .find({}, {}, {limit})
      .select(FILM_SHORT_FIELDS)
      .sort({publicationDate: SortType.Down})
      .populate(['userID'])
      .exec();
  }

  public async editByID(movieID: string, dto: EditMovieDto): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieID, dto, {new: true})
      .populate(['userID'])
      .exec();
  }

  public async deleteById(movieID: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndDelete(movieID)
      .exec();
  }

  public async findByGenre(genreType: string, count?: number): Promise<DocumentType<MovieEntity>[]> {
    const limit = count ?? DEFAULT_MOVIE_COUNT;
    return this.movieModel
      .find({genreMovie: genreType}, {}, {limit})
      .sort({publicationDate: SortType.Down})
      .populate(['userID'])
      .exec();
  }

  public async findPromo(): Promise<DocumentType<MovieEntity>[] | null> {
    return this.movieModel
      .aggregate([
        {
          $sample: {size: 1},
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userID',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $unset: 'user._id'
        },
      ]);
  }

  public async findFavorites(): Promise<DocumentType<MovieEntity>[] | null> {
    return this.movieModel
      .find()
      .populate(['userID'])
      .exec();
  }

  public async editFavorite(movieID: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findById(movieID)
      .populate(['userID'])
      .exec();
  }

  public async incCommentCount(movieID: string): Promise<DocumentType<MovieEntity > | null> {
    return this.movieModel
      .findByIdAndUpdate(movieID, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async exists(movieID: string): Promise<boolean> {
    return (await this.movieModel
      .exists({_id: movieID})) !== null;
  }
}
