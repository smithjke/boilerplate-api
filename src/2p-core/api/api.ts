import { Static, TSchema } from '@sinclair/typebox';

export type RequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
};

export const createRequest = <T extends TSchema>(config: RequestConfig, schema: T): Static<T> => {
  return () => {};
};
