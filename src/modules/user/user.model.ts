import mongoose from 'mongoose';
import { User } from '../../types/user.type.js';

export interface UserDocument extends User, mongoose.Document {
  createAd: Date,
  updateAt: Date,
}

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLenght: [1, 'Min lenght for name is 1'],
    maxLenght: [15, 'Max lenght for name is 15'],
  },

  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },

  avatar: String,

  password: {
    type: String,
    required: true,
    minLenght: [6, 'Min lenght for password is 6'],
    maxLenght: [15, 'Max lenght for password is 15'],
  },

  favorites: [String],
}, {
  timestamps: true,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
