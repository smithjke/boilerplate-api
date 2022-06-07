export type ApiParams<DATA = void> = {
  query?: Record<string, string>;
  token?: string;
  data?: DATA;
};
