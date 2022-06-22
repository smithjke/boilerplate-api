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
  user: User;
  session: Session;
};

export type AuthInitResultRaw = {
  user: UserRaw;
  session: SessionRaw;
};

export function mapAuthInitResult(data: AuthInitResult): AuthInitResultRaw {
  return {
    user: mapUser(data.user),
    session: mapSession(data.session),
  };
}

export function mapAuthInitResultRaw(dataRaw: AuthInitResultRaw): AuthInitResult {
  return {
    user: mapUserRaw(dataRaw.user),
    session: mapSessionRaw(dataRaw.session),
  };
}
