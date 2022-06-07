import { createRestMiddleware } from '~/1st-rest-server';
import { userCreate, userGet, userList } from '../methods';

export const restMiddleware = createRestMiddleware([
  ['post', '/user', userCreate],
  ['get', '/user/:id', userGet],
  ['get', '/user', userList],
]);
