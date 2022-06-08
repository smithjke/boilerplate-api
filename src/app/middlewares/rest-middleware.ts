import { createRestMiddleware } from '~/1st-rest-server';
import {
  authLogin,
  testRequest,
  userCreate,
  userGet,
  userList,
} from '../methods';

export const restMiddleware = createRestMiddleware([
  ['post', '/auth/login', authLogin],
  ['get', '/user/:id', userGet],
  ['get', '/user', userList],
  ['post', '/user', userCreate],
  ['post', '/test-request', testRequest],
]);
