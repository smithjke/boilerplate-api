import { makeQueryString } from '~/1st-core';
import {
  ApiListQuery,
  ApiListResult,
  ApiParams,
  createMapApiListResult,
} from '~/1st-api';
import { RestClient } from '~/1st-rest';
import { CrudClient } from './crud-client';

export abstract class CrudRestClient<MODEL_TYPE, MODEL_TYPE_RAW> extends RestClient implements CrudClient<MODEL_TYPE> {
  protected abstract mapModel: (model: MODEL_TYPE) => MODEL_TYPE_RAW;

  protected abstract mapModelRaw: (modelRaw: MODEL_TYPE_RAW) => MODEL_TYPE;

  protected createHeaders: (params: ApiParams<MODEL_TYPE>) => HeadersInit = (params: ApiParams) => ({
    'Content-Type': 'application/json',
    'session-token': params.token,
  });

  create(params: ApiParams<MODEL_TYPE>): Promise<MODEL_TYPE> {
    return this.fetchJson({
      method: 'post',
      endpoint: '',
      headers: this.createHeaders(params),
      body: this.mapModel(params.data),
      mapResult: this.mapModelRaw,
    });
  }

  update(params: ApiParams<MODEL_TYPE, { id: string; }>): Promise<MODEL_TYPE> {
    const { id } = params.query;
    return this.fetchJson({
      method: 'put',
      endpoint: `/${id}`,
      headers: this.createHeaders(params),
      body: this.mapModel(params.data),
      mapResult: this.mapModelRaw,
    });
  }

  list(params: ApiParams<undefined, ApiListQuery>): Promise<ApiListResult<MODEL_TYPE>> {
    const paramsRaw = params;
    return this.fetchJson({
      method: 'get',
      endpoint: `?${paramsRaw.query ? makeQueryString(paramsRaw.query) : void 0}`,
      headers: this.createHeaders(params),
      mapResult: createMapApiListResult(this.mapModelRaw),
    });
  }

  get(params: ApiParams<undefined, { id: string; }>): Promise<MODEL_TYPE> {
    const { id } = params.query;
    return this.fetchJson({
      method: 'get',
      endpoint: `/${id}`,
      headers: this.createHeaders(params),
      mapResult: this.mapModelRaw,
    });
  }

  delete(params: ApiParams<undefined, { id: string; }>): Promise<void> {
    const { id } = params.query;
    return this.fetchJson({
      method: 'delete',
      headers: this.createHeaders(params),
      endpoint: `/${id}`,
    });
  }
}
