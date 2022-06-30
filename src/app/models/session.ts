import mongoose from 'mongoose';
import { virtualId } from '~/1st-server-mongo';
import { Session, User } from '~/api';

export const sessionSchema = new mongoose.Schema<Session>({
  token: String,
  ip: String,
  userId: mongoose.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
});

sessionSchema.virtual<string>('id').get(virtualId);

sessionSchema.virtual<User>('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export const SessionModel = mongoose.model<Session>('Session', sessionSchema);
