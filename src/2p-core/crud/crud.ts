import { TSchema } from '@sinclair/typebox';
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';
import { ApiConfig, AxiosService } from '../api';
import { CrudListQuery, CrudListResult, makeCrudListResultSchema } from './crud-list';

export interface CrudService<E, C_E, U_E, L_E, K extends object, OF, F> {
  create: (data: C_E) => Promise<E>;
  update: (data: U_E, params: K) => Promise<E>;
  remove: (params: K) => Promise<void>;
  findOne: (params: K) => Promise<E>;
  findAll: (query: CrudListQuery<OF, F>) => Promise<CrudListResult<L_E>>;
}

export interface AnyCrudService extends CrudService<any, any, any, any, any, any, any> {}

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

export abstract class CrudAxiosService<E, C_E, U_E, L_E, K extends object, OF, F>
  extends AxiosService
  implements CrudService<E, C_E, U_E, L_E, K, OF, F> {

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

  async create(data: C_E): Promise<E> {
    return this.request<E>({
      ...crudApiConfig.create,
      data,
    }, this.validateEntity);
  }

  async update(data: U_E, params: K): Promise<E> {
    return this.request<E>({
      ...crudApiConfig.update,
      params,
      data,
    }, this.validateEntity);
  }

  async remove(params: K): Promise<void> {
    return this.request<void>({
      ...crudApiConfig.remove,
      params,
    });
  }

  async findOne(params: K): Promise<E> {
    return this.request<E>({
      ...crudApiConfig.findOne,
      params,
    }, this.validateEntity);
  }

  async findAll(query: CrudListQuery<OF, F>): Promise<CrudListResult<L_E>> {
    return this.request<CrudListResult<L_E>>({
      ...crudApiConfig.findAll,
      query,
    }, this.validateFindAllResult);
  }
}

export abstract class AnyCrudAxiosService extends CrudAxiosService<any, any, any, any, any, any, any> {}
