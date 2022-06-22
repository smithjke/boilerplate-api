export type AsyncData<DATA> = {
  data: DATA;
  error: Error;
  loading: boolean;
};
