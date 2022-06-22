import { mapOrVoid } from '~/1st-api';

export type Session = {
  id?: string;
  token?: string;
  ip?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SessionRaw = {
  id?: string;
  token?: string;
  ip?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
};

export function mapSession(data: Session): SessionRaw {
  return {
    id: data.id,
    token: data.token,
    ip: data.ip,
    user_id: data.userId,
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
    createdAt: mapOrVoid(dataRaw.created_at, (date) => new Date(date)),
    updatedAt: mapOrVoid(dataRaw.updated_at, (date) => new Date(date)),
  };
}
