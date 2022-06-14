import { BaseClient, HttpMethod } from '~/1st-api';

export type RestResponseType = 'text' | 'json';

export abstract class RestClient extends BaseClient {
  protected abstract url: string;

  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return headers;
  }

  // protected async fetch<T>(method: HttpMethod, urn: string, body: object, type?: RestResponseType): Promise<T> {
  protected async fetch<T>(props: {
    method: HttpMethod;
    endpoint: string;
    body?: any;
    type?: RestResponseType;
    mapResult?: (result: any) => T;
  }): Promise<T> {
    const uri = `${this.url}${props.endpoint}`;

    const response = await fetch(uri, {
      method: props.method,
      headers: this.transformHeaders({ 'Content-Type': 'application/json' }),
      body: props.body ? JSON.stringify(props.body) : void 0,
    });

    const responseType = props.type || 'json';

    // @todo refactor
    switch (responseType) {
      case 'json':
        const json = await response.json();
        return props.mapResult ? props.mapResult(json): json;
      case 'text':
        const text = await response.text();
        return props.mapResult ? props.mapResult(text): (text as unknown as T);
    }
  }

  protected async call(address: string, params: object): Promise<object> {
    return { a: 1 };
  }
}
