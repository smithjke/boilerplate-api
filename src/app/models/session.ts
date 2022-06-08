import mongoose from 'mongoose';

export type Session = {
  token: string;
  ip: string;
  userId: string;
  createdAt: Date;
};

export const sessionSchema = new mongoose.Schema<Session>({
  token: String,
  ip: String,
  userId: mongoose.Types.ObjectId,
  createdAt: Date,
});

sessionSchema.virtual<string>('id').get(function () { return this['_id']; });

export const SessionModel = mongoose.model<Session>('Session', sessionSchema);
