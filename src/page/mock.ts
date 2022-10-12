import { Page } from '@smithjke/boilerplate-schema';
import { RuntimeRepository } from '~/app';

const currentTimestamp = Number(new Date());

export const items: Array<Page.Entity> = [
  {
    id: '1',
    title: 'Page 1',
    name: 'page1',
    content: 'First page content',
    createdAt: currentTimestamp - 1200,
    updatedAt: currentTimestamp - 1000,
  },
  {
    id: '2',
    title: 'Page 2',
    name: 'page2',
    content: 'Second page content',
    createdAt: currentTimestamp - 1400,
    updatedAt: currentTimestamp - 900,
  },
];

export const createRepository = () => new RuntimeRepository(items);
