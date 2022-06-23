import { ApiListQuery, ApiListResult } from '~/1st-api';
import { CrudClient } from '../clients';
import { CrudService } from './crud-service';

export abstract class ClientCrudService<MODEL_TYPE> implements CrudService<MODEL_TYPE> {
  protected abstract crudClient: CrudClient<MODEL_TYPE>;

  create(partialData: MODEL_TYPE): Promise<MODEL_TYPE> {
    return this.crudClient.create({
      data: partialData,
    });
  }

  update(partialData: MODEL_TYPE, id: string): Promise<MODEL_TYPE> {
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

  get(id: string): Promise<MODEL_TYPE> {
    return this.crudClient.get({
      query: { id },
    });
  }

  list(query: ApiListQuery): Promise<ApiListResult<MODEL_TYPE>> {
    return this.crudClient.list({
      query,
    });
  }
}
