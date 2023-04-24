import { User } from '../../types/user.type.js';
import typegoose, {defaultClasses, getModelForClass, Severity} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  },
  options: {allowMixed: Severity.ALLOW},
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.userName = data.userName;
    this.email = data.email;
    this.avatar = data.avatar;
  }

  @prop({required: true, default: ''})
  public userName!: string;

  @prop({unique: true, required: true})
  public email!: string;

  @prop({default: ''})
  public avatar!: string;

  @prop({required: true, default: ''})
  private password!: string;

  @prop({default: []})
  public favorites!: string[];

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
