export type ApiParams<DATA = any, QUERY = any> = {
  query?: QUERY;
  token?: string;
  data?: DATA;
};
