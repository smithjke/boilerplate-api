import { mapOrVoid } from '~/1st-api';

export type AuthLoginData = {
  login: string;
  password: string;
};

export type AuthLoginDataRaw = {
  login: string;
  password: string;
};

export function mapAuthLoginData(data: AuthLoginData): AuthLoginDataRaw {
  return {
    login: mapOrVoid(data.login, String),
    password: mapOrVoid(data.password, String),
  };
}

export function mapAuthLoginDataRaw(dataRaw: AuthLoginDataRaw): AuthLoginData {
  return {
    login: mapOrVoid(dataRaw.login, String),
    password: mapOrVoid(dataRaw.password, String),
  };
}
