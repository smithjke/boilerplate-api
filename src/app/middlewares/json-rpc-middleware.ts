import { createJsonRpcMiddleware } from '~/1st-json-rpc-server';
import { testJrpc, userCreate, userGet, userList } from '../methods';

export const jsonRpcMiddleware = createJsonRpcMiddleware({
  ['test-jrpc']: testJrpc,
  ['user-create']: userCreate,
  ['user-get']: userGet,
  ['user-list']: userList,
});
