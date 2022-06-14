import { ApiListParams, ApiListResult } from '~/1st-api';

export interface CrudService<MODEL_TYPE> {
  create(partialData: Partial<MODEL_TYPE>): Promise<Partial<MODEL_TYPE>>;

  update(partialData: Partial<MODEL_TYPE>, id: string): Promise<Partial<MODEL_TYPE>>;

  delete(id: string): Promise<void>;

  get(id: string): Promise<Partial<MODEL_TYPE>>;

  list(query: ApiListParams['query']): Promise<ApiListResult<Partial<MODEL_TYPE>>>;
}
