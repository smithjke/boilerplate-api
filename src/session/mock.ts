import { Session } from '@smithjke/boilerplate-schema';
import { RuntimeRepository } from '~/app/repositories';

const currentTimestamp = Number(new Date());

export const items: Array<Session.Entity> = [
  {
    id: '1',
    accessToken: '1111',
    accessTokenExpiredAt: currentTimestamp + 10000,
    refreshToken: '1111',
    refreshTokenExpiredAt: currentTimestamp + 100000,
    userId: '1',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
  {
    id: '2',
    accessToken: '2222',
    accessTokenExpiredAt: currentTimestamp + 10000,
    refreshToken: '2222',
    refreshTokenExpiredAt: currentTimestamp + 100000,
    userId: '2',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
];

export const createRepository = () => new RuntimeRepository(items);
