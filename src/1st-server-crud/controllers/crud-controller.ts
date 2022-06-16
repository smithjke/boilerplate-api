import { ApiListParams, ApiListResult, ApiParams, createMapApiListResult } from '~/1st-api';
import { BaseController } from '~/1st-server-api';
import { CrudService } from '~/1st-crud';

export abstract class CrudController<MODEL_TYPE, MODEL_TYPE_RAW> extends BaseController {
  protected abstract crudService: CrudService<MODEL_TYPE>;

  protected abstract mapModel: (model: Partial<MODEL_TYPE>) => Partial<MODEL_TYPE_RAW>;

  protected abstract mapModelRaw: (modelRaw: Partial<MODEL_TYPE_RAW>) => Partial<MODEL_TYPE>;

  async create(params: ApiParams<Partial<MODEL_TYPE_RAW>>): Promise<Partial<MODEL_TYPE_RAW>> {
    const data = this.mapModelRaw(params.data);
    const result = await this.crudService.create(data);
    return this.mapModel(result);
  }

  async update(params: ApiParams<Partial<MODEL_TYPE_RAW>, { id: string; }>): Promise<Partial<MODEL_TYPE_RAW>> {
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

  async get(params: ApiParams<void, { id: string; }>): Promise<Partial<MODEL_TYPE_RAW>> {
    const { id } = params.query;
    const result = await this.crudService.get(id);
    return this.mapModel(result);
  }

  async list(params: ApiListParams): Promise<ApiListResult<Partial<MODEL_TYPE_RAW>>> {
    const result = await this.crudService.list(params.query);
    return createMapApiListResult(this.mapModel)(result);
  }
}
