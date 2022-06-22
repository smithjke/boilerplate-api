import { ApiListParams, ApiListResult } from '~/1st-api';

export interface CrudService<MODEL_TYPE> {
  create(partialData: MODEL_TYPE): Promise<MODEL_TYPE>;

  update(partialData: MODEL_TYPE, id: string): Promise<MODEL_TYPE>;

  delete(id: string): Promise<void>;

  get(id: string): Promise<MODEL_TYPE>;

  list(query: ApiListParams['query']): Promise<ApiListResult<MODEL_TYPE>>;
}
