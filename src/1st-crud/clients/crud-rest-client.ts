import { makeQueryString } from '~/1st-core';
import {
  ApiListParams,
  ApiListResult,
  ApiParams,
  createMapApiListResult,
} from '~/1st-api';
import { RestClient } from '~/1st-rest';
import { CrudClient } from './crud-client';

export abstract class CrudRestClient<MODEL_TYPE, MODEL_TYPE_RAW> extends RestClient implements CrudClient<MODEL_TYPE> {
  protected abstract mapModel: (model: Partial<MODEL_TYPE>) => Partial<MODEL_TYPE_RAW>;

  protected abstract mapModelRaw: (modelRaw: Partial<MODEL_TYPE_RAW>) => Partial<MODEL_TYPE>;

  create(params: ApiParams<Partial<MODEL_TYPE>>): Promise<Partial<MODEL_TYPE>> {
    return this.fetch({
      method: 'post',
      endpoint: '',
      body: this.mapModel(params.data),
      mapResult: this.mapModelRaw,
    });
  }

  update(params: ApiParams<Partial<MODEL_TYPE>, { id: string; }>): Promise<Partial<MODEL_TYPE>> {
    const { id } = params.query;
    return this.fetch({
      method: 'put',
      endpoint: `/${id}`,
      body: this.mapModel(params.data),
      mapResult: this.mapModelRaw,
    });
  }

  list(params: ApiListParams): Promise<ApiListResult<Partial<MODEL_TYPE>>> {
    const paramsRaw = params;
    return this.fetch({
      method: 'get',
      endpoint: `?${paramsRaw.query ? makeQueryString(paramsRaw.query) : void 0}`,
      mapResult: createMapApiListResult(this.mapModelRaw),
    });
  }

  get(params: ApiParams<void, { id: string; }>): Promise<Partial<MODEL_TYPE>> {
    const { id } = params.query;
    return this.fetch({
      method: 'get',
      endpoint: `/${id}`,
      mapResult: this.mapModelRaw,
    });
  }

  delete(params: ApiParams<void, { id: string; }>): Promise<void> {
    const { id } = params.query;
    return this.fetch({
      method: 'delete',
      endpoint: `/${id}`,
    });
  }
}
