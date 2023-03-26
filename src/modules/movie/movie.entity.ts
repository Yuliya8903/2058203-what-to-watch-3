import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface MovieEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'movies'
  }
})

export class MovieEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public titleMovie!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop()
  public publicationDate!: Date;

  @prop({required: true})
  public genreMovie!: string;

  @prop({required: true})
  public releaseYear!: number;

  @prop({default: 0})
  public rating!: number;

  @prop({required: true})
  public moviePreviewLink!: string;

  @prop({required: true})
  public movieVideoLink!: string;

  @prop({required: true})
  public actors!: string[];

  @prop({required: true})
  public director!: string;

  @prop ({required: true})
  public duration!: number;

  @prop ({required: true})
  public poster!: string;

  @prop ({default: 0})
  public commentsCount!: number;

  @prop ({
    ref: UserEntity,
    required: true
  })
  public userID!: Ref<UserEntity>;

  @prop ({required: true})
  public backgroundImage!: string;

  @prop ({required: true})
  public backgroundColor!: string;
}

export const MovieModel = getModelForClass(MovieEntity);
