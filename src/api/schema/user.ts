import { mapIfExists } from '~/1st-api';
import {
  mapRole,
  mapRoleRaw,
  Role,
  RoleRaw,
} from './role';

export type User = {
  id?: string;
  name?: string;
  newPassword?: string;
  rolesIds?: Array<string>;
  roles?: Array<Role>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserRaw = {
  id?: string;
  name?: string;
  new_password?: string;
  roles_ids?: Array<string>;
  roles?: Array<RoleRaw>;
  created_at?: string;
  updated_at?: string;
};

export function mapUser(data: User): UserRaw {
  return {
    id: mapIfExists(data.id, String),
    name: mapIfExists(data.name, String),
    new_password: mapIfExists(data.newPassword, String),
    roles_ids: mapIfExists(data.rolesIds, (ids) => ids.map(String)),
    roles: mapIfExists(data.roles, (roles) => roles.map(mapRole)),
    created_at: mapIfExists(data.createdAt, (date) => date.toISOString()),
    updated_at: mapIfExists(data.updatedAt, (date) => date.toISOString()),
  };
}

export function mapUserRaw(dataRaw: UserRaw): User {
  return {
    id: mapIfExists(dataRaw.id, String),
    name: mapIfExists(dataRaw.name, String),
    newPassword: mapIfExists(dataRaw.new_password, String),
    rolesIds: mapIfExists(dataRaw.roles_ids, (ids) => ids.map(String)),
    roles: mapIfExists(dataRaw.roles, (roles) => roles.map(mapRoleRaw)),
    createdAt: mapIfExists(dataRaw.created_at, (date) => new Date(date)),
    updatedAt: mapIfExists(dataRaw.updated_at, (date) => new Date(date)),
  };
}
