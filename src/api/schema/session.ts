import { mapOrNull, mapOrVoid } from '~/1st-api';
import {
  mapUser,
  mapUserRaw,
  User,
  UserRaw,
} from '~/api';

export type Session = {
  id?: string;
  token?: string;
  ip?: string;
  userId?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SessionRaw = {
  id?: string;
  token?: string;
  ip?: string;
  user_id?: string;
  user?: UserRaw;
  created_at?: string;
  updated_at?: string;
};

export function mapSession(data: Session): SessionRaw {
  return {
    id: data.id,
    token: data.token,
    ip: data.ip,
    user_id: data.userId,
    user: data.user && mapUser(data.user),
    created_at: data.createdAt && data.createdAt.toISOString(),
    updated_at: data.updatedAt && data.updatedAt.toISOString(),
  };
}

export function mapSessionRaw(dataRaw: SessionRaw): Session {
  return {
    id: mapOrVoid(dataRaw.id, String),
    token: mapOrVoid(dataRaw.token, String),
    ip: mapOrVoid(dataRaw.ip, String),
    userId: mapOrVoid(dataRaw.user_id, String),
    user: mapOrNull(dataRaw.user, mapUserRaw),
    createdAt: mapOrVoid(dataRaw.created_at, (date) => new Date(date)),
    updatedAt: mapOrVoid(dataRaw.updated_at, (date) => new Date(date)),
  };
}
