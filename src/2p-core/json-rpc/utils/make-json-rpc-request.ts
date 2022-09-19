import { JsonRpcRequest } from '../common';

export function makeJsonRpcRequest<T = any>(id: JsonRpcRequest['id'], method: string, params: T): JsonRpcRequest<T> {
  return {
    jsonrpc: '2.0',
    id,
    method,
    params,
  };
}
