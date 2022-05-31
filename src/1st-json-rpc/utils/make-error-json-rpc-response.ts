import { JsonRpcResponse, JsonRpcResponseError } from '../common';

export function makeErrorJsonRpcResponse(id: JsonRpcResponse['id'], error: JsonRpcResponseError): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    error,
  };
}
