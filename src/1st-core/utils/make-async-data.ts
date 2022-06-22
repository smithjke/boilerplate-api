import { AsyncData } from '../common';

export function makeAsyncData<DATA>(data: DATA): AsyncData<DATA> {
  return {
    data,
    error: null,
    loading: false,
  };
}
