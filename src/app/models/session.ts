import mongoose from 'mongoose';
import { virtualId } from '~/1st-server-mongo';
import { Session } from '~/api';

export const sessionSchema = new mongoose.Schema<Session>({
  token: String,
  ip: String,
  userId: mongoose.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
});

sessionSchema.virtual<string>('id').get(virtualId);

export const SessionModel = mongoose.model<Session>('Session', sessionSchema);
