import { AsyncData } from '../common';

export function makeLoadingAsyncData<DATA = any>(): AsyncData<DATA> {
  return {
    data: null,
    error: null,
    loading: true,
  };
}
