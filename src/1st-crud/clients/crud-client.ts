import { ApiListQuery, ApiListResult, ApiParams } from '~/1st-api';

export interface CrudClient<MODEL_TYPE> {
  create(params: ApiParams<MODEL_TYPE>): Promise<MODEL_TYPE>;

  update(params: ApiParams<MODEL_TYPE, { id: string; }>): Promise<MODEL_TYPE>;

  delete(params: ApiParams<void, { id: string; }>): Promise<void>;

  get(params: ApiParams<void, { id: string; }>): Promise<MODEL_TYPE>;

  list(params: ApiParams<void, ApiListQuery>): Promise<ApiListResult<MODEL_TYPE>>;
}
