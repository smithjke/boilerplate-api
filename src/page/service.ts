import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';
import { CrudFastifyService } from '@smithjke/2p-server/crud';
import { Page } from '@smithjke/boilerplate-schema';
import { usePageRepository } from './di';

export class Service extends CrudFastifyService<Page.EntityCrudType> implements Page.Service {
  private repository = usePageRepository();

  async create(data: Page.CreateEntity): Promise<Page.SingleEntity> {
    return this.repository.create(data);
  };

  async update(data: Page.UpdateEntity, params: Page.EntityKey): Promise<Page.SingleEntity> {
    return this.repository.update(data, params.id);
  };

  async remove(params: Page.EntityKey): Promise<void> {
    await this.repository.remove(params.id);
  };

  async findOne(params: Page.EntityKey): Promise<Page.SingleEntity> {
    return this.repository.findOne({ id: params.id });
  };

  async findAll(query?: CrudFindAllQuery<Page.EntityCrudType>): Promise<CrudFindAllResult<Page.EntityCrudType>> {
    return this.repository.findAll(query);
  };
}
