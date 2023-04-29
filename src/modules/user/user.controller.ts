import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/components.type.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import LoginUserDto from './dto/login-user.dto.js';
import MovieResponse from '../movie/response/movie.response.js';
import CreateUserDto from './dto/create-user.dto.js';
import UserResponse from './response/user.response.js';
import { UserServiceInterface } from './user-service.interface.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super (logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/favorites/:userId', method: HttpMethod.Get, handler: this.getFavorites});
    this.addRoute({path: '/favorites/:userId', method: HttpMethod.Post, handler: this.addFavorite});
    this.addRoute({path: '/favorites/:userId', method: HttpMethod.Delete, handler: this.removeFavorite});
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {

    const existsUser = await this.userService.findByEmail(body.email);

    if(existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email}" exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async getFavorites({params}: Request, res: Response): Promise<void> {
    const result = await this.userService.findFavorites(params.userId);
    this.ok(
      res,
      fillDTO(MovieResponse, result)
    );
  }

  public async addFavorite({body, params}: Request, res: Response): Promise<void> {
    await this.userService.addFavorite(params.userId, body.movieId);
    this.ok(
      res,
      []
    );
  }

  public async removeFavorite({body, params}: Request, res: Response): Promise<void> {
    await this.userService.removeFavorite(params.userId, body.movieId);
    this.ok(
      res,
      []
    );
  }
}
