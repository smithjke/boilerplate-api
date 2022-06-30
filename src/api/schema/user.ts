import { mapOrVoid } from '~/1st-api';
import { mapRole, mapRoleRaw, Role, RoleRaw } from './role';

export type User = {
  id?: string;
  name?: string;
  password?: string;
  salt?: string;
  rolesIds?: Array<string>;
  roles?: Array<Role>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserRaw = {
  id?: string;
  name?: string;
  password?: string;
  salt?: string;
  roles_ids?: Array<string>;
  roles?: Array<RoleRaw>;
  created_at?: string;
  updated_at?: string;
};

export function mapUser(data: User): UserRaw {
  return {
    id: data.id,
    name: data.name,
    password: data.password,
    salt: data.salt,
    roles_ids: data.rolesIds?.map(String),
    roles: data.roles?.map(mapRole),
    created_at: data.createdAt?.toISOString(),
    updated_at: data.updatedAt?.toISOString(),
  };
}

export function mapUserRaw(dataRaw: UserRaw): User {
  return {
    id: mapOrVoid(dataRaw.id, String),
    name: mapOrVoid(dataRaw.name, String),
    password: mapOrVoid(dataRaw.password, String),
    salt: mapOrVoid(dataRaw.salt, String),
    rolesIds: mapOrVoid(dataRaw.roles_ids, (roles_ids) => roles_ids.map(String)),
    roles: mapOrVoid(dataRaw.roles, (roles) => roles.map(mapRoleRaw)),
    createdAt: mapOrVoid(dataRaw.created_at, (date) => new Date(date)),
    updatedAt: mapOrVoid(dataRaw.updated_at, (date) => new Date(date)),
  };
}
