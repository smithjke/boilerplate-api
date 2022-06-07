import mongoose from 'mongoose';
import { User } from '~/api';

export const userSchema = new mongoose.Schema<User>({
  id: mongoose.Types.ObjectId,
  name: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

// userSchema.virtual<string>('id').get(function () { return this._id });

export const UserModel = mongoose.model<User>('User', userSchema);
