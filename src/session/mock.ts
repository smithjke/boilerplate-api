import { randomString } from '@smithjke/2p-core';
import { Session } from '@smithjke/boilerplate-schema';
import { RuntimeRepository } from '~/app';

const currentTimestamp = Number(new Date());

export const items: Array<Session.Entity> = [
  {
    id: '1',
    accessToken: 'aaa',
    accessTokenExpiredAt: currentTimestamp + 30 * 60 * 1000, // 30 min
    refreshToken: randomString(32),
    refreshTokenExpiredAt: currentTimestamp + 24 * 60 * 60 * 1000, // 1 day
    userId: '1',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
  {
    id: '2',
    accessToken: 'bbb',
    accessTokenExpiredAt: currentTimestamp + 30 * 1000, // 30 sec
    refreshToken: randomString(32),
    refreshTokenExpiredAt: currentTimestamp + 24 * 60 * 60 * 1000, // 1 day
    userId: '2',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
];

export const createRepository = () => new RuntimeRepository(items);
