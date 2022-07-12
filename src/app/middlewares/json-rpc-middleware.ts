import { createControllerMethod as ccm } from '~/1st-server-api';
import { createJsonRpcMiddleware } from '~/1st-server-json-rpc';
import {
  AuthController,
  RoleController,
  SessionController,
  UserController,
} from '../controllers';

export const jsonRpcMiddleware = () => createJsonRpcMiddleware({
  ['auth-login']: ccm(AuthController, 'login'),
  ['auth-init']: ccm(AuthController, 'init'),

  ['role-create']: ccm(RoleController, 'create'),
  ['role-update']: ccm(RoleController, 'update'),
  ['role-get']: ccm(RoleController, 'get'),
  ['role-list']: ccm(RoleController, 'list'),
  ['role-delete']: ccm(RoleController, 'delete'),

  ['session-create']: ccm(SessionController, 'create'),
  ['session-update']: ccm(SessionController, 'update'),
  ['session-get']: ccm(SessionController, 'get'),
  ['session-list']: ccm(SessionController, 'list'),
  ['session-delete']: ccm(SessionController, 'delete'),
  ['session-get-by-token']: ccm(SessionController, 'getByToken'),

  ['user-create']: ccm(UserController, 'create'),
  ['user-update']: ccm(UserController, 'update'),
  ['user-get']: ccm(UserController, 'get'),
  ['user-list']: ccm(UserController, 'list'),
  ['user-delete']: ccm(UserController, 'delete'),
});
