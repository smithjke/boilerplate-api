import { ApiListQuery, ApiListResult, ApiParams, createMapApiListResult } from '~/1st-api';
import { CrudService } from '~/1st-crud';
import { BaseController } from '~/1st-server-api';

export abstract class CrudController<MODEL_TYPE, MODEL_TYPE_RAW> extends BaseController {
  protected abstract crudService: CrudService<MODEL_TYPE>;

  protected abstract mapModel: (model: MODEL_TYPE) => MODEL_TYPE_RAW;

  protected abstract mapModelRaw: (modelRaw: MODEL_TYPE_RAW) => MODEL_TYPE;

  async create(params: ApiParams<MODEL_TYPE_RAW>): Promise<MODEL_TYPE_RAW> {
    const data = this.mapModelRaw(params.data);
    const result = await this.crudService.create(data);
    return this.mapModel(result);
  }

  async update(params: ApiParams<MODEL_TYPE_RAW, { id: string; }>): Promise<MODEL_TYPE_RAW> {
    const { id } = params.query;
    const data = this.mapModelRaw(params.data);
    const result = await this.crudService.update(data, id);
    return this.mapModel(result);
  }

  async delete(params: ApiParams<void, { id: string; }>): Promise<void> {
    const { id } = params.query;
    await this.crudService.delete(id);
    return void 0;
  }

  async get(params: ApiParams<void, { id: string; }>): Promise<MODEL_TYPE_RAW> {
    const { id } = params.query;
    const result = await this.crudService.get(id);
    return this.mapModel(result);
  }

  async list(params: ApiParams<void, ApiListQuery>): Promise<ApiListResult<MODEL_TYPE_RAW>> {
    const result = await this.crudService.list(params.query);
    return createMapApiListResult(this.mapModel)(result);
  }
}
