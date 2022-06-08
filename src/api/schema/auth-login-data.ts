import { mapOrNull, mapOrVoid } from '~/1st-api';

export type AuthLoginData = {
  login: string;
  password: string;
};

export type AuthLoginDataRaw = {
  login: string;
  password: string;
};

export function mapAuthLoginData(data: Partial<AuthLoginData>): Partial<AuthLoginDataRaw> {
  return {
    login: mapOrVoid(data.login, String),
    password: mapOrVoid(data.password, String),
  };
}

export function mapAuthLoginDataRaw(dataRaw: Partial<AuthLoginDataRaw>): AuthLoginData {
  return {
    login: mapOrNull(dataRaw.login, String),
    password: mapOrNull(dataRaw.password, String),
  };
}
