import { createControllerMethod } from '~/1st-api-server';
import { createRestMiddleware } from '~/1st-rest-server';
import {
  authLogin,
  testRequest,
} from '../methods';
import { useSessionController, useUserController } from '../di';

export const restMiddleware = () => createRestMiddleware([
  ['post', '/auth/login', authLogin],
  ['post', '/test-request', testRequest],

  ['post', '/session', createControllerMethod(useSessionController(), 'create')],
  ['put', '/session/:id', createControllerMethod(useSessionController(), 'update')],
  ['get', '/session/:id', createControllerMethod(useSessionController(), 'get')],
  ['get', '/session', createControllerMethod(useSessionController(), 'list')],
  ['delete', '/session/:id', createControllerMethod(useSessionController(), 'delete')],
  ['get', '/session/token/:token', createControllerMethod(useSessionController(), 'getByToken')],

  ['post', '/user', createControllerMethod(useUserController(), 'create')],
  ['put', '/user/:id', createControllerMethod(useUserController(), 'update')],
  ['get', '/user/:id', createControllerMethod(useUserController(), 'get')],
  ['get', '/user', createControllerMethod(useUserController(), 'list')],
  ['delete', '/user/:id', createControllerMethod(useUserController(), 'delete')],
]);
