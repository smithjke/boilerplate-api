import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { fillUrl, makeQueryString } from './utils';

export type ImprovedAxiosRequestConfig = AxiosRequestConfig & {
  url: string;
  params?: object;
  query?: object;
};

export const mapImprovedAxiosRequestConfig = (config: ImprovedAxiosRequestConfig, prefix?: string): AxiosRequestConfig => {
  const {
    url,
    params,
    query,
    ...axiosRequestConfig
  } = config;

  return {
    ...axiosRequestConfig,
    url: `${prefix}${params ? fillUrl(url, params) : url}`,
    params: query,
    paramsSerializer: (p: object) => makeQueryString(p),
  };
};

export type AxiosServiceBeforeRequestHandler = (config: AxiosRequestConfig) => AxiosRequestConfig;

export abstract class AxiosService {
  private readonly prefix: string;

  private beforeRequestHandler?: AxiosServiceBeforeRequestHandler;

  protected axiosInstance: AxiosInstance;

  constructor(prefix: string, axiosRequestConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(axiosRequestConfig);
    this.prefix = prefix;
  }

  beforeRequest(handler: AxiosServiceBeforeRequestHandler): void {
    this.beforeRequestHandler = handler;
  }

  async request<R>(config: ImprovedAxiosRequestConfig, typeCheck?: TypeCheck<any>): Promise<R> {
    const axiosRequestConfig = mapImprovedAxiosRequestConfig(config, this.prefix);
    const handledAxiosRequestConfig = this.beforeRequestHandler
      ? this.beforeRequestHandler(axiosRequestConfig)
      : axiosRequestConfig;

    const axiosResponse = await this.axiosInstance.request<R>(handledAxiosRequestConfig);

    if (typeCheck) {
      const errors = [...typeCheck.Errors(axiosResponse.data)];

      if (errors.length) {
        throw new Error('Validation error');
      }
    }

    return axiosResponse.data;
  }
}

export type ApiConfig<SERVICE, EXCLUDED_SERVICE = void> = EXCLUDED_SERVICE extends void
  ? Record<keyof SERVICE, ImprovedAxiosRequestConfig>
  : Record<Exclude<keyof SERVICE, keyof EXCLUDED_SERVICE>, ImprovedAxiosRequestConfig>;

export type ApiRecord = Record<string, AxiosService>;

export type ApiControls = {
  setBaseURL: (url: string) => void;
};

export function createApi<T extends ApiRecord>(apiRecord: T): T & ApiControls {
  let baseURL = '';
  const apiInstance: T = {} as T;

  const handler: ProxyHandler<T[keyof T]> = {
    // get(target: T[keyof T], p: string | symbol, receiver: any): any {
    //   console.log('target', target);
    //   console.log('p', p);
    //   console.log('receiver', receiver);
    //   return target[p];
    // }
  };

  const beforeRequestHandler: AxiosServiceBeforeRequestHandler = (config) => ({
    ...config,
    baseURL,
  });

  Object.keys(apiRecord).map((key: keyof T) => {
    apiRecord[key].beforeRequest(beforeRequestHandler);
    apiInstance[key] = new Proxy(apiRecord[key], handler);
  });

  const setBaseURL = (url: string) => baseURL = url;

  return {
    ...apiInstance,
    setBaseURL,
  };
}
