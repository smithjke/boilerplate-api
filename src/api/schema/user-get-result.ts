import { mapUser, mapUserRaw, User, UserRaw } from './user';

export type UserGetResult = Partial<User>;

export type UserGetResultRaw = Partial<UserRaw>;

export const mapUserGetResult = mapUser;

export const mapUserGetResultRaw = mapUserRaw;
