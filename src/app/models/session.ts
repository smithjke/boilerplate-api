import mongoose from 'mongoose';
import { Session } from '~/api';

export const sessionSchema = new mongoose.Schema<Session>({
  token: String,
  ip: String,
  userId: mongoose.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
});

sessionSchema.virtual<string>('id').get(function () { return this['_id']; });

export const SessionModel = mongoose.model<Session>('Session', sessionSchema);
