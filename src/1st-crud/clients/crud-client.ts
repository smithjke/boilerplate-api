import { ApiListParams, ApiListResult, ApiParams } from '~/1st-api';

export interface CrudClient<MODEL_TYPE> {
  create(params: ApiParams<Partial<MODEL_TYPE>>): Promise<Partial<MODEL_TYPE>>;

  update(params: ApiParams<Partial<MODEL_TYPE>>): Promise<Partial<MODEL_TYPE>>;

  delete(params: ApiParams): Promise<void>;

  get(params: ApiParams): Promise<Partial<MODEL_TYPE>>;

  list(params: ApiListParams): Promise<ApiListResult<Partial<MODEL_TYPE>>>;
}
