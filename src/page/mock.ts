import { Page } from '@smithjke/boilerplate-schema';
import { RuntimeRepository } from '~/app/repositories';

const currentTimestamp = Number(new Date());

export const items: Array<Page.Entity> = [
  {
    id: '1',
    title: '123',
    name: 'Lupa',
    content: '123',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
  {
    id: '2',
    title: '123',
    name: 'Pupa',
    content: '123',
    createdAt: currentTimestamp - 1400,
    updatedAt: currentTimestamp - 900,
  },
];

export const createRepository = () => new RuntimeRepository(items);
