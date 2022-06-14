export type CrudServiceListQuery = {
  limit?: number;
  skip?: number;
};

export type CrudServiceListResult<MODEL_TYPE> = {
  list: Array<MODEL_TYPE>;
  total: number;
};

export abstract class CrudService<MODEL_TYPE> {
  abstract create(partialData: Partial<MODEL_TYPE>): Promise<MODEL_TYPE>;

  abstract update(partialData: Partial<MODEL_TYPE>, id: string): Promise<MODEL_TYPE>;

  abstract get(id: string): Promise<MODEL_TYPE>;

  abstract list(query: CrudServiceListQuery): Promise<CrudServiceListResult<MODEL_TYPE>>;

  abstract delete(id: string): Promise<void>;
}
