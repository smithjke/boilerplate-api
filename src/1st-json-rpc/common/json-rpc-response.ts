export type JsonRpcResponseError = {
  code: number;
  message: string;
  data?: any;
};

export type JsonRpcResponse<T = any> = {
  jsonrpc: '2.0';
  id: string | number;
  result?: T;
  error?: JsonRpcResponseError;
};
