import mongoose from 'mongoose';
import { virtualId } from '~/1st-server-mongo';
import { Role, User } from '~/api';

export type MongoUser = User & {
  _id?: mongoose.Types.ObjectId,
  password?: string,
  salt?: string,
};

export const userSchema = new mongoose.Schema<MongoUser>({
  name: String,
  password: String,
  salt: String,
  rolesIds: [mongoose.Types.ObjectId],
  createdAt: Date,
  updatedAt: Date,
});

userSchema.virtual<string>('id').get(virtualId);

userSchema.virtual<Role>('roles', {
  ref: 'Role',
  localField: 'rolesIds',
  foreignField: '_id',
});

export const UserModel = mongoose.model<User>('User', userSchema);
