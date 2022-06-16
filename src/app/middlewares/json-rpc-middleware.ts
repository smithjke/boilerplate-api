import { createControllerMethod } from '~/1st-server-api';
import { createJsonRpcMiddleware } from '~/1st-server-json-rpc';
import {
  AuthController,
  SessionController,
  UserController,
} from '~/app';

export const jsonRpcMiddleware = () => createJsonRpcMiddleware({
  ['auth-login']: createControllerMethod(AuthController, 'login'),

  ['user-create']: createControllerMethod(UserController, 'create'),
  ['user-update']: createControllerMethod(UserController, 'update'),
  ['user-get']: createControllerMethod(UserController, 'get'),
  ['user-list']: createControllerMethod(UserController, 'list'),
  ['user-delete']: createControllerMethod(UserController, 'delete'),

  ['session-create']: createControllerMethod(SessionController, 'create'),
  ['session-update']: createControllerMethod(SessionController, 'update'),
  ['session-get']: createControllerMethod(SessionController, 'get'),
  ['session-list']: createControllerMethod(SessionController, 'list'),
  ['session-delete']: createControllerMethod(SessionController, 'delete'),
});
