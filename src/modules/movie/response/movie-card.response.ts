import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class MovieCardResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public titleMovie!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public genreMovie!: string;

  @Expose()
  public releaseYear!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public moviePreviewLink!: string;

  @Expose()
  public movieVideoLink!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public duration!: number;

  @Expose()
  public poster!: string;

  @Expose()
  public comments!: number;

  @Expose()
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;
}
