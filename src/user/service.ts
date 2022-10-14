import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';
import { CrudFastifyService } from '@smithjke/2p-server/crud';
import { User } from '@smithjke/boilerplate-schema';
import { useUserRepository } from './di';

export class Service extends CrudFastifyService<User.EntityCrudType> implements User.Service {
  private repository = useUserRepository();

  async create(data: User.CreateEntity): Promise<User.SingleEntity> {
    return this.repository.create(data);
  }

  async update(data: User.UpdateEntity, params: User.EntityKey): Promise<User.SingleEntity> {
    return this.repository.update(data, params.id);
  }

  async remove(params: User.EntityKey): Promise<void> {
    await this.repository.remove(params.id);
  }

  async findOne(params: User.EntityKey): Promise<User.SingleEntity> {
    return this.repository.findOne({ id: params.id });
  }

  async findAll(query?: CrudFindAllQuery<User.EntityCrudType>): Promise<CrudFindAllResult<User.EntityCrudType>> {
    return this.repository.findAll(query);
  }
}
