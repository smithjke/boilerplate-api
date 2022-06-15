export type ApiListParams = {
  query?: Record<string, string | number> & {
    limit: number;
    skip: number;
  };
  token?: string;
};
