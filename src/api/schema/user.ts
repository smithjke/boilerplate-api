import { mapOrVoid } from '~/1st-api';

export type User = {
  id?: string;
  name?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserRaw = {
  id?: string;
  name?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
};

export function mapUser(data: User): UserRaw {
  return {
    id: data.id,
    name: data.name,
    password: data.password,
    created_at: data.createdAt && data.createdAt.toISOString(),
    updated_at: data.updatedAt && data.updatedAt.toISOString(),
  };
}

export function mapUserRaw(dataRaw: UserRaw): User {
  return {
    id: mapOrVoid(dataRaw.id, String),
    name: mapOrVoid(dataRaw.name, String),
    password: mapOrVoid(dataRaw.password, String),
    createdAt: mapOrVoid(dataRaw.created_at, (date) => new Date(date)),
    updatedAt: mapOrVoid(dataRaw.updated_at, (date) => new Date(date)),
  };
}
