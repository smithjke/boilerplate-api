import { JsonRpcResponse } from '../common';

export function makeResultJsonRpcResponse<T = any>(id: JsonRpcResponse['id'], result: T): JsonRpcResponse<T> {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}
