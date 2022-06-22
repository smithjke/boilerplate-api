export type ApiListQuery = {
  limit: number;
  skip: number;
  sort: string;
  direction: 'asc' | 'desc';
};
