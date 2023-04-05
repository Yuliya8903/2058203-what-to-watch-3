import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import {UserServiceInterface} from './user-service.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import CreateUserDto from './dto/create-user.dto.js';
import {Component} from '../../types/component.type.js';
import mongoose from 'mongoose';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface,
        @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findByID(userID: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(userID).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async findFavorites(userID: string): Promise<DocumentType<UserEntity>[] | null> {
    return this.userModel
      .aggregate([
        {
          $unwind: '$favorites',
        },
        {
          $match: { '_id': new mongoose.Types.ObjectId(userID) },
        },
        {
          $lookup: {
            from: 'movies',
            localField: 'favorites',
            foreignField: '_id',
            as: 'movie'
          },
        },
        {
          $unwind: '$movie'
        },
        {
          $addFields: {
            titleMovie: '$movie.titleMovie',
            publicationDate: '$movie.publicationDate',
            genreMovie: '$movie.genreMovie',
            moviePreviewLink: '$movie.moviePreviewLink',
            user: '$movie.userID',
            poster: '$movie.poster',
            commentsCount: '$movie.commentsCount'
          }
        },
        {
          $project: {'_id': 0, 'userName': 0, 'email': 0, 'avatar': 0, 'password': 0, 'createdAt': 0, 'updatedAt': 0, 'favorites': 0, 'movie': 0}
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user'
        },
      ]);
  }

  public async addFavorite(userID: string, movieID: string): Promise<void | null> {
    return this.userModel.findByIdAndUpdate(userID,
      {
        $push: {favorites: movieID}
      });
  }

  public async removeFavorite(userID: string, movieID: string): Promise<void | null> {
    return this.userModel.findByIdAndUpdate(userID,
      {
        $pull: {favorites: movieID}
      });
  }
}
