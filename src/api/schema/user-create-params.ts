import { ApiParams, createMapApiParams } from '~/1st-api';
import { mapUser, mapUserRaw, User, UserRaw } from './user';

export type UserCreateParams = ApiParams<Partial<User>>;

export type UserCreateParamsRaw = ApiParams<Partial<UserRaw>>;

export const mapUserCreateParams = createMapApiParams(mapUser);

export const mapUserCreateParamsRaw = createMapApiParams(mapUserRaw);
