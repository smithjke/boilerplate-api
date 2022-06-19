import { makeJsonRpcRequest } from '../utils';
import { JsonRpcError } from './json-rpc-error';
import { JsonRpcResponse } from '~/1st-json-rpc';

export type CallOptions<PARAMS, RESULT> = {
  params?: PARAMS;
  mapParams?: (params: PARAMS) => object;
  mapResult?: (result: object) => RESULT;
};

export class JsonRpcClient {
  protected readonly url: string;

  protected readonly addMethodToUrl?: boolean;

  protected readonly dontCheckMetaData?: boolean;

  private getMethodUrl(method: string): string {
    return this.addMethodToUrl ? `${this.url}/${method}` : this.url;
  }

  async call<PARAMS, RESULT>(method: string, options?: CallOptions<PARAMS, RESULT>): Promise<RESULT> {
    const randomString = String(Math.random());

    const data = makeJsonRpcRequest(
      randomString,
      method,
      options?.params
        ? (
          options?.mapParams
            ? options.mapParams(options.params)
            : options.params
        )
        : void 0,
    );

    const response = await fetch(
      this.getMethodUrl(method),
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const json: JsonRpcResponse = await response.json();

    if (!this.dontCheckMetaData) {
      if (json.jsonrpc !== '2.0' || json.id !== randomString) {
        throw new JsonRpcError('Internal error', -32603);
      }
    }

    if (json.error) {
      throw new JsonRpcError(json.error.message, json.error.code);
    }

    if (typeof json.result === 'undefined') {
      throw new JsonRpcError('No result', 0);
    }

    return options?.mapResult ? options.mapResult(json.result) : json.result;
  }
}
