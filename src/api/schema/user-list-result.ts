import { ApiListResult, createMapApiListResult } from '~/1st-api';
import { mapUser, mapUserRaw, User, UserRaw } from './user';

export type UserListResult = ApiListResult<Partial<User>>;

export type UserListResultRaw = ApiListResult<Partial<UserRaw>>;

export const mapUserListResult = createMapApiListResult(mapUser);

export const mapUserListResultRaw = createMapApiListResult(mapUserRaw);
