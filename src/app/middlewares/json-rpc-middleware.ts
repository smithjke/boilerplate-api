import { createJsonRpcMiddleware } from '~/1st-json-rpc-server';
import {
  authLogin,
  testRequest,
  userCreate,
  userGet,
  userList,
} from '../methods';

export const jsonRpcMiddleware = createJsonRpcMiddleware({
  ['auth-login']: authLogin,
  ['test-request']: testRequest,
  ['user-create']: userCreate,
  ['user-get']: userGet,
  ['user-list']: userList,
});
