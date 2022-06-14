import { createControllerMethod } from '~/1st-api-server';
import { createJsonRpcMiddleware } from '~/1st-json-rpc-server';
import {
  authLogin,
  testRequest,
  userCreate,
  userGet,
  userList,
} from '../methods';
import { useSessionController } from '../di';

export const jsonRpcMiddleware = () => createJsonRpcMiddleware({
  ['auth-login']: authLogin,
  ['test-request']: testRequest,
  ['user-create']: userCreate,
  ['user-get']: userGet,
  ['user-list']: userList,
  ['session-create']: createControllerMethod(useSessionController(), 'create'),
  ['session-update']: createControllerMethod(useSessionController(), 'update'),
  ['session-get']: createControllerMethod(useSessionController(), 'get'),
  ['session-list']: createControllerMethod(useSessionController(), 'list'),
  ['session-delete']: createControllerMethod(useSessionController(), 'delete'),
});
