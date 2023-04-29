import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class MovieResponse {
  @Expose()
  public id!: string;

  @Expose()
  public titleMovie!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public genreMovie!: string;

  @Expose()
  public moviePreviewLink!: string;

  @Expose()
  public comments!: number;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public poster!: string;
}
