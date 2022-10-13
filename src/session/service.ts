import { Session } from '@smithjke/boilerplate-schema';
import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';
import { useSessionRepository } from './di';
import { useUserService } from '~/user';
import { CrudFastifyService } from '@smithjke/2p-server/crud';

export class Service extends CrudFastifyService<Session.EntityCrudType> implements Session.Service {
  private repository = useSessionRepository();

  private userService = useUserService();

  async create(data: Session.CreateEntity): Promise<Session.SingleEntity> {
    const entity = await this.repository.create(data);
    const user = await this.userService.findOne({ id: entity.userId });
    return {
      ...entity,
      user,
    };
  }

  async update(data: Session.UpdateEntity, params: Session.EntityKey): Promise<Session.SingleEntity> {
    const entity = await this.repository.update(data, params.id);
    const user = await this.userService.findOne({ id: entity.userId });
    return {
      ...entity,
      user,
    };
  }

  async remove(params: Session.EntityKey): Promise<void> {
    await this.repository.remove(params.id);
  };

  async findOne(params: Session.EntityKey): Promise<Session.SingleEntity> {
    const entity = await this.repository.findOne(params.id);
    const user = await this.userService.findOne({ id: entity.userId });
    return {
      ...entity,
      user,
    };
  }

  async findAll(query?: CrudFindAllQuery<Session.EntityCrudType>): Promise<CrudFindAllResult<Session.EntityCrudType>> {
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
  }

  async getActiveSession(accessToken: string): Promise<Session.ListedEntity> {
    const entities = await this.findAll({
      filter: {
        accessToken,
      },
    });
    console.log('entities >>>', entities);
    if (entities?.total !== 1) {
      throw new Error('Find session error');
    }
    const entity = entities.list[0];
    if (entity.accessTokenExpiredAt < Number(new Date())) {
      throw new Error('No session');
    }
    return entity;
  }
}
