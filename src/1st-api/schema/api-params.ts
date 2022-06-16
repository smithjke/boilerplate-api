export type ApiParams<DATA = void, QUERY = void> = {
  query?: QUERY;
  token?: string;
  data?: DATA;
};
