import { createControllerMethod } from '~/1st-api-server';
import { createRestMiddleware } from '~/1st-rest-server';
import {
  authLogin,
  testRequest,
  userCreate,
  userGet,
  userList,
} from '../methods';
import { useSessionController } from '../di';

export const restMiddleware = () => createRestMiddleware([
  ['post', '/auth/login', authLogin],
  ['get', '/user/:id', userGet],
  ['get', '/user', userList],
  ['post', '/user', userCreate],
  ['post', '/test-request', testRequest],
  ['post', '/session', createControllerMethod(useSessionController(), 'create')],
  ['put', '/session/:id', createControllerMethod(useSessionController(), 'update')],
  ['get', '/session/token/:token', createControllerMethod(useSessionController(), 'getByToken')],
  ['get', '/session/:id', createControllerMethod(useSessionController(), 'get')],
  ['get', '/session', createControllerMethod(useSessionController(), 'list')],
  ['delete', '/session/:id', createControllerMethod(useSessionController(), 'delete')],
]);
