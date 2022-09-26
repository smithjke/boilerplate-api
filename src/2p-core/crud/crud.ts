import { TSchema } from '@sinclair/typebox';
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';
import { ApiConfig, AxiosService } from '../api';
import { CrudListQuery, CrudListResult, makeCrudListResultSchema } from './crud-list';

export type CrudSchema = {
  entity: TSchema;
  createEntity: TSchema;
  updateEntity: TSchema;
  listedEntity: TSchema;
  entityKey: TSchema;
  entityFilter: TSchema;
  entityOrderField: TSchema;
};

export type CrudType<
  E extends object,
  C_E extends object,
  U_E extends object,
  L_E extends object,
  K extends object,
  F extends object,
  OF extends string,
  > = {
  entity: E;
  createEntity: C_E;
  updateEntity: U_E;
  listedEntity: L_E;
  entityKey: K;
  entityFilter: F;
  entityOrderField: OF;
};

export type BaseCrudType = CrudType<object, object, object, object, object, object, string>;

export type AnyCrudType = CrudType<any, any, any, any, any, any, any>;

export interface CrudService<T extends BaseCrudType> {
  create: (data: T['createEntity']) => Promise<T['entity']>;
  update: (data: T['updateEntity'], params: T['entityKey']) => Promise<T['entity']>;
  remove: (params: T['entityKey']) => Promise<void>;
  findOne: (params: T['entityKey']) => Promise<T['entity']>;
  findAll: (query?: CrudListQuery<T['entityOrderField'], T['entityFilter']>) => Promise<CrudListResult<T['listedEntity']>>;
}

export type BaseCrudService = CrudService<BaseCrudType>;

export type AnyCrudService = CrudService<AnyCrudType>;

export const crudApiConfig: ApiConfig<AnyCrudService> = {
  create: {
    method: 'POST',
    url: '',
  },
  update: {
    method: 'PUT',
    url: '/:id',
  },
  remove: {
    method: 'DELETE',
    url: '/:id',
  },
  findOne: {
    method: 'GET',
    url: '/:id',
  },
  findAll: {
    method: 'GET',
    url: '',
  },
};

export abstract class CrudAxiosService<T extends BaseCrudType> extends AxiosService implements CrudService<T> {
  private _validateEntity?: TypeCheck<any>;

  private _validateFindAllResult?: TypeCheck<any>;

  protected abstract entity: TSchema;

  protected abstract listedEntity: TSchema;

  get validateEntity(): TypeCheck<any> {
    if (!this._validateEntity) {
      this._validateEntity = TypeCompiler.Compile(this.entity);
    }

    return this._validateEntity;
  }

  get validateFindAllResult(): TypeCheck<any> {
    if (!this._validateFindAllResult) {
      this._validateFindAllResult = TypeCompiler.Compile(makeCrudListResultSchema(this.listedEntity));
    }

    return this._validateFindAllResult;
  }

  async create(data: T['createEntity']): Promise<T['entity']> {
    return this.request<T['entity']>({
      ...crudApiConfig.create,
      data,
    }, this.validateEntity);
  }

  async update(data: T['updateEntity'], params: T['entityKey']): Promise<T['entity']> {
    return this.request<T['entity']>({
      ...crudApiConfig.update,
      params,
      data,
    }, this.validateEntity);
  }

  async remove(params: T['entityKey']): Promise<void> {
    return this.request<void>({
      ...crudApiConfig.remove,
      params,
    });
  }

  async findOne(params: T['entityKey']): Promise<T['entity']> {
    return this.request<T['entity']>({
      ...crudApiConfig.findOne,
      params,
    }, this.validateEntity);
  }

  async findAll(query?: CrudListQuery<T['entityOrderField'], T['entityFilter']>): Promise<CrudListResult<T['listedEntity']>> {
    return this.request<CrudListResult<T['listedEntity']>>({
      ...crudApiConfig.findAll,
      query,
    }, this.validateFindAllResult);
  }
}

export abstract class AnyCrudAxiosService extends CrudAxiosService<AnyCrudType> {}
