import { ApiError, BaseClient } from '~/1st-api';
import { getApiErrorCodeByHttpCode, HttpMethod } from '~/1st-rest';

export abstract class RestClient extends BaseClient {
  protected abstract url: string;

  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return headers;
  }

  protected async fetchJson<T>(props: {
    method: HttpMethod;
    endpoint: string;
    headers?: HeadersInit;
    body?: any;
    mapResult?: (result: any) => T;
  }): Promise<T> {
    const uri = `${this.url}${props.endpoint}`;

    const response = await fetch(uri, {
      method: props.method,
      headers: this.transformHeaders(props.headers),
      body: props.body ? JSON.stringify(props.body) : void 0,
    });

    if ([200, 201, 202, 304].includes(response.status)) {
      const json = await response.json();
      return props.mapResult ? props.mapResult(json) : json;
    }

    throw new ApiError(response.statusText, getApiErrorCodeByHttpCode(response.status));
  }

  protected async fetchText(props: {
    method: HttpMethod;
    endpoint: string;
    headers?: HeadersInit;
    body?: any;
  }): Promise<string> {
    const uri = `${this.url}${props.endpoint}`;

    const response = await fetch(uri, {
      method: props.method,
      headers: this.transformHeaders(props.headers),
      body: props.body ? JSON.stringify(props.body) : void 0,
    });

    if ([200, 201, 202, 304].includes(response.status)) {
      return response.text();
    }

    throw new ApiError(response.statusText, getApiErrorCodeByHttpCode(response.status));
  }
}
