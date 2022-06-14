import { ApiListParams, ApiListResult } from '~/1st-api';
import { CrudClient } from '../clients';
import { CrudService } from './crud-service';

export abstract class ClientCrudService<MODEL_TYPE> implements CrudService<MODEL_TYPE> {
  protected abstract crudClient: CrudClient<MODEL_TYPE>;

  create(partialData: Partial<MODEL_TYPE>): Promise<Partial<MODEL_TYPE>> {
    return this.crudClient.create({
      data: partialData,
    });
  }

  update(partialData: Partial<MODEL_TYPE>, id: string): Promise<Partial<MODEL_TYPE>> {
    return this.crudClient.update({
      query: { id },
      data: partialData,
    });
  }

  delete(id: string): Promise<void> {
    return this.crudClient.delete({
      query: { id },
    });
  }

  get(id: string): Promise<Partial<MODEL_TYPE>> {
    return this.crudClient.get({
      query: { id },
    });
  }

  list(query: ApiListParams['query']): Promise<ApiListResult<Partial<MODEL_TYPE>>> {
    return this.crudClient.list({
      query,
    });
  }
}
