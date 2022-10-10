import { User } from '@smithjke/boilerplate-schema';
import { RequestMetaData } from '@smithjke/2p-core/api';
import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';
import { useUserRepository } from './di';

export class Service implements User.Service {
  private repository = useUserRepository();

  async create(
    data: User.CreateEntity,
    requestMetaData?: RequestMetaData,
  ): Promise<User.SingleEntity> {
    return this.repository.create(data);
  };

  async update(
    data: User.UpdateEntity,
    params: User.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<User.SingleEntity> {
    return this.repository.update(data, params.id);
  };

  async remove(
    params: User.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<void> {
    await this.repository.remove(params.id);
  };

  async findOne(
    params: User.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<User.SingleEntity> {
    return this.repository.findOne(params.id);
  };

  async findAll(
    query?: CrudFindAllQuery<User.EntityOrderField, User.EntityFilter>,
    requestMetaData?: RequestMetaData,
  ): Promise<CrudFindAllResult<User.ListedEntity>> {
    return this.repository.findAll(query);
  };
}
