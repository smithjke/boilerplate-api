import { User } from '@smithjke/boilerplate-schema';
import { RuntimeRepository } from '~/app/repositories';

const currentTimestamp = Number(new Date());

export const items: Array<User.Entity> = [
  {
    id: '1',
    name: 'Lupa',
    passwordHash: '123',
    passwordSalt: '123',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
  {
    id: '2',
    name: 'Pupa',
    passwordHash: '123',
    passwordSalt: '123',
    createdAt: currentTimestamp - 1400,
    updatedAt: currentTimestamp - 900,
  },
];

export const createRepository = () => new RuntimeRepository(items);
