import { BaseClient, HttpMethod } from '~/1st-api';

export type RestResponseType = 'text' | 'json';

export abstract class RestClient extends BaseClient {
  protected abstract url: string;

  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return headers;
  }

  protected async fetchJson<T>(props: {
    method: HttpMethod;
    endpoint: string;
    headers?: Record<string, string>;
    body?: any;
    mapResult?: (result: any) => T;
  }): Promise<T> {
    const uri = `${this.url}${props.endpoint}`;

    const response = await fetch(uri, {
      method: props.method,
      headers: this.transformHeaders({ 'Content-Type': 'application/json', ...props.headers }),
      body: props.body ? JSON.stringify(props.body) : void 0,
    });

    if ([200, 201, 202, 304].includes(response.status)) {
      const json = await response.json();
      return props.mapResult ? props.mapResult(json) : json;
    }

    throw new Error(response.statusText);
  }

  protected async fetchText(props: {
    method: HttpMethod;
    endpoint: string;
    body?: any;
  }): Promise<string> {
    const uri = `${this.url}${props.endpoint}`;

    const response = await fetch(uri, {
      method: props.method,
      headers: this.transformHeaders({}),
      body: props.body ? JSON.stringify(props.body) : void 0,
    });

    if ([200, 201, 202, 304].includes(response.status)) {
      return response.text();
    }

    throw new Error(response.statusText);
  }

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

    if (responseType === 'json') {
      const json = await response.json();
      return props.mapResult ? props.mapResult(json) : json;
    }

    const text = await response.text();
    return props.mapResult ? props.mapResult(text) : (text as unknown as T);
  }

  protected async call(address: string, params: object): Promise<object> {
    console.log('RestClient call >>>', address, params);
    return { a: 1 };
  }
}
