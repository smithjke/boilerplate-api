import { mapOrVoid } from '~/1st-api';

export type Role = {
  id?: string;
  name?: string;
  permissions?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type RoleRaw = {
  id?: string;
  name?: string;
  permissions?: string;
  created_at?: string;
  updated_at?: string;
};

export function mapRole(data: Role): RoleRaw {
  return {
    id: mapOrVoid(data.id, String),
    name: mapOrVoid(data.name, String),
    permissions: mapOrVoid(data.permissions, String),
    created_at: data.createdAt?.toISOString(),
    updated_at: data.updatedAt?.toISOString(),
  };
}

export function mapRoleRaw(dataRaw: RoleRaw): Role {
  return {
    id: mapOrVoid(dataRaw.id, String),
    name: mapOrVoid(dataRaw.name, String),
    permissions: mapOrVoid(dataRaw.permissions, String),
    createdAt: mapOrVoid(dataRaw.created_at, (date) => new Date(date)),
    updatedAt: mapOrVoid(dataRaw.updated_at, (date) => new Date(date)),
  };
}
