import { Page } from '@smithjke/boilerplate-schema';
import { RequestMetaData } from '@smithjke/2p-core/api';
import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';
import { usePageRepository } from './di';

export class Service implements Page.Service {
  private repository = usePageRepository();

  async create(
    data: Page.CreateEntity,
    requestMetaData?: RequestMetaData,
  ): Promise<Page.SingleEntity> {
    return this.repository.create(data);
  };

  async update(
    data: Page.UpdateEntity,
    params: Page.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<Page.SingleEntity> {
    return this.repository.update(data, params.id);
  };

  async remove(
    params: Page.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<void> {
    await this.repository.remove(params.id);
  };

  async findOne(
    params: Page.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<Page.SingleEntity> {
    return this.repository.findOne(params.id);
  };

  async findAll(
    query?: CrudFindAllQuery<Page.EntityOrderField, Page.EntityFilter>,
    requestMetaData?: RequestMetaData,
  ): Promise<CrudFindAllResult<Page.ListedEntity>> {
    return this.repository.findAll(query);
  };
}
