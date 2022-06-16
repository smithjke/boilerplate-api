import { createControllerMethod } from '~/1st-server-api';
import { createRestMiddleware } from '~/1st-server-rest';
import {
  AuthController,
  SessionController,
  UserController,
} from '../controllers';

export const restMiddleware = () => createRestMiddleware([
  ['post', '/auth/login', createControllerMethod(AuthController, 'login')],

  ['post', '/session', createControllerMethod(SessionController, 'create')],
  ['put', '/session/:id', createControllerMethod(SessionController, 'update')],
  ['get', '/session/:id', createControllerMethod(SessionController, 'get')],
  ['get', '/session', createControllerMethod(SessionController, 'list')],
  ['delete', '/session/:id', createControllerMethod(SessionController, 'delete')],
  ['get', '/session/token/:token', createControllerMethod(SessionController, 'getByToken')],

  ['post', '/user', createControllerMethod(UserController, 'create')],
  ['put', '/user/:id', createControllerMethod(UserController, 'update')],
  ['get', '/user/:id', createControllerMethod(UserController, 'get')],
  ['get', '/user', createControllerMethod(UserController, 'list')],
  ['delete', '/user/:id', createControllerMethod(UserController, 'delete')],
]);
