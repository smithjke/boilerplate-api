import { ApiParams, createMapApiParams } from '~/1st-api';
import { AuthLoginData, AuthLoginDataRaw, mapAuthLoginData, mapAuthLoginDataRaw } from './auth-login-data';

export type AuthLoginParams = ApiParams<Partial<AuthLoginData>>;

export type AuthLoginParamsRaw = ApiParams<Partial<AuthLoginDataRaw>>;

export const mapAuthLoginParams = createMapApiParams(mapAuthLoginData);

export const mapAuthLoginParamsRaw = createMapApiParams(mapAuthLoginDataRaw);
