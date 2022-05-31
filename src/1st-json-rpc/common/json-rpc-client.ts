import { JsonRpcError } from './json-rpc-error';

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

  async call<PARAMS, RESULT>(method: string, options: CallOptions<PARAMS, RESULT>): Promise<RESULT> {
    const randomString = String(Math.random());

    const data = {
      jsonrpc: '2.0',
      method,
      params: options.params ? (options.mapParams ? options.mapParams(options.params) : options.params) : void 0,
      id: randomString,
    };

    const response = await fetch(
      this.getMethodUrl(method),
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const json = await response.json();

    const { jsonrpc, result, error, id } = json;

    if (!this.dontCheckMetaData) {
      if (jsonrpc !== '2.0' || id !== randomString) {
        throw new JsonRpcError('Internal error', -32603);
      }
    }

    if (error) {
      throw new JsonRpcError(error.message, error.code);
    }

    if (typeof result === 'undefined') {
      throw new JsonRpcError('No result', 0);
    }

    return options.mapResult ? options.mapResult(result) : result;
  }
}