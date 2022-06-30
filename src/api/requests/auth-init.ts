import {
  mapSession,
  mapSessionRaw,
  mapUser,
  mapUserRaw,
  Session,
  SessionRaw,
  User,
  UserRaw,
} from '../schema';

export type AuthInitResult = {
  user?: User;
  session?: Session;
  permissions?: Array<string>;
};

export type AuthInitResultRaw = {
  user?: UserRaw;
  session?: SessionRaw;
  permissions?: Array<string>;
};

export function mapAuthInitResult(data: AuthInitResult): AuthInitResultRaw {
  return {
    user: data.user && mapUser(data.user),
    session: data.session && mapSession(data.session),
    permissions: data.permissions,
  };
}

export function mapAuthInitResultRaw(dataRaw: AuthInitResultRaw): AuthInitResult {
  return {
    user: dataRaw.user && mapUserRaw(dataRaw.user),
    session: dataRaw.session && mapSessionRaw(dataRaw.session),
    permissions: dataRaw.permissions,
  };
}
