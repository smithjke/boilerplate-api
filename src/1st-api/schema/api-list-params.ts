export type ApiListParams = {
  query?: Record<string, string> & {
    limit: number;
    skip: number;
  };
  token?: string;
};
