import { Session } from '@smithjke/boilerplate-schema';
import { RequestMetaData } from '@smithjke/2p-core/api';
import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';
import { useSessionRepository } from './di';
import { useUserService } from '~/user';

export class Service implements Session.Service {
  private repository = useSessionRepository();

  private userService = useUserService();

  async create(
    data: Session.CreateEntity,
    requestMetaData?: RequestMetaData,
  ): Promise<Session.SingleEntity> {
    const entity = await this.repository.create(data);
    const user = await this.userService.findOne({ id: entity.userId });
    return {
      ...entity,
      user,
    };
  };

  async update(
    data: Session.UpdateEntity,
    params: Session.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<Session.SingleEntity> {
    const entity = await this.repository.update(data, params.id);
    const user = await this.userService.findOne({ id: entity.userId });
    return {
      ...entity,
      user,
    };
  };

  async remove(
    params: Session.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<void> {
    await this.repository.remove(params.id);
  };

  async findOne(
    params: Session.EntityKey,
    requestMetaData?: RequestMetaData,
  ): Promise<Session.SingleEntity> {
    const entity = await this.repository.findOne(params.id);
    const user = await this.userService.findOne({ id: entity.userId });
    return {
      ...entity,
      user,
    };
  };

  async findAll(
    query?: CrudFindAllQuery<Session.EntityOrderField, Session.EntityFilter>,
    requestMetaData?: RequestMetaData,
  ): Promise<CrudFindAllResult<Session.ListedEntity>> {
    const all = await this.repository.findAll(query);
    let list = [];
    for (const entity of all.list) {
      const user = await this.userService.findOne({ id: entity.userId });
      list.push({
        ...entity,
        user,
      });
    }
    return {
      list,
      total: all.total,
    };
  };
}
