import { createControllerMethod as ccm } from '~/1st-server-api';
import { createRestMiddleware } from '~/1st-server-rest';
import {
  AuthController,
  RoleController,
  SessionController,
  UserController,
} from '../controllers';

export const restMiddleware = () => createRestMiddleware([
  ['post', '/auth/login', ccm(AuthController, 'login')],
  ['get', '/auth/init', ccm(AuthController, 'init')],

  ['post', '/role', ccm(RoleController, 'create')],
  ['put', '/role/:id', ccm(RoleController, 'update')],
  ['get', '/role/:id', ccm(RoleController, 'get')],
  ['get', '/role', ccm(RoleController, 'list')],
  ['delete', '/role/:id', ccm(RoleController, 'delete')],

  ['post', '/session', ccm(SessionController, 'create')],
  ['put', '/session/:id', ccm(SessionController, 'update')],
  ['get', '/session/:id', ccm(SessionController, 'get')],
  ['get', '/session', ccm(SessionController, 'list')],
  ['delete', '/session/:id', ccm(SessionController, 'delete')],
  ['get', '/session/token/:token', ccm(SessionController, 'getByToken')],

  ['post', '/user', ccm(UserController, 'create')],
  ['put', '/user/:id', ccm(UserController, 'update')],
  ['get', '/user/:id', ccm(UserController, 'get')],
  ['get', '/user', ccm(UserController, 'list')],
  ['delete', '/user/:id', ccm(UserController, 'delete')],
]);
