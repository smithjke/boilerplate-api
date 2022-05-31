import { createJsonRpcMiddleware } from '~/1st-json-rpc-server';
import { testJrpc } from '../methods/test-jrpc';

export const jsonRpcMiddleware = createJsonRpcMiddleware({
  ['test-jrpc']: testJrpc,
});
