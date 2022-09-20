import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { fillUrl, makeQueryString } from './utils';

export type ImprovedAxiosRequestConfig = AxiosRequestConfig & {
  url: string;
  params?: object;
  query?: object;
};

export const mapImprovedAxiosRequestConfig = (config: ImprovedAxiosRequestConfig): AxiosRequestConfig => {
  const {
    url,
    params,
    query,
    ...axiosRequestConfig
  } = config;

  const urlArray = [params ? fillUrl(url, params) : url];

  if (query) {
    urlArray.push(makeQueryString(query));
  }

  return {
    ...axiosRequestConfig,
    url: urlArray.join('?'),
  };
};

export abstract class AxiosService {
  protected axiosInstance: AxiosInstance;

  constructor(axiosRequestConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(axiosRequestConfig);
  }

  async request<R>(config: ImprovedAxiosRequestConfig, typeCheck?: TypeCheck<any>): Promise<R> {
    const axiosRequestConfig = mapImprovedAxiosRequestConfig(config);
    const axiosResponse = await this.axiosInstance.request<R>(axiosRequestConfig);

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
