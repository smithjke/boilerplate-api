import { AsyncData } from '../common';

export function makeErrorAsyncData<DATA = any>(error: Error): AsyncData<DATA> {
  return {
    data: null,
    error,
    loading: false,
  };
}
