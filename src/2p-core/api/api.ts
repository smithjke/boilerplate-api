import { Static, TSchema } from '@sinclair/typebox';
import axios from 'axios';

export type RequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
};

type BaseRequest = {
  params?: object;
  query?: object;
  data?: object;
};

const fillUrl = (url: string, params: any): string =>
  Object.keys(params).reduce((str, key) => str.split(`:${key}`).join(params[key]), url);

export const createRequest = <T extends TSchema>(config: RequestConfig, schema: T): Static<T> => {
  return async (request: BaseRequest) => {
    console.log('call request schema >>>', schema);
    const { data } = request;
    const { method } = config;
    const url = request.params ? fillUrl(config.url, request.params) : config.url;
    console.log('url >>>', url);
    const response = await axios.request({
      method,
      url,
      data,
    });
    console.log('response.data >>>', response.data);
    return response.data;
  };
};
