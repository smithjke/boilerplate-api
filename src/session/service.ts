import { CrudFastifyService } from '@smithjke/2p-server/crud';
import { Session } from '@smithjke/boilerplate-schema';
import { FastifyError } from '@smithjke/2p-server/api';
import { useUserService } from '~/user';
import { useSessionRepository } from './di';

export class Service extends CrudFastifyService<Session.EntityCrudType> implements Session.Service {
  protected repository = useSessionRepository();

  private userService = useUserService();

  async findOne(params: Session.EntityKey): Promise<Session.SingleEntity> {
    const entity = await this.repository.findOne(params);

    if (!entity) {
      throw new FastifyError('No Entity', 404);
    }

    const user = await this.userService.findOne({ id: entity.userId });

    return {
      ...entity,
      user,
    };
  }

  async findOneByAccessToken(accessToken: string): Promise<Session.SingleEntity> {
    const entity = await this.repository.findOne({ accessToken });

    if (!entity) {
      throw new FastifyError('No Entity', 404);
    }

    const user = await this.userService.findOne({ id: entity.userId });

    return {
      ...entity,
      user,
    };
  }

  async findOneByRefreshToken(refreshToken: string): Promise<Session.SingleEntity> {
    const entity = await this.repository.findOne({ refreshToken });

    if (!entity) {
      throw new FastifyError('No Entity', 404);
    }

    const user = await this.userService.findOne({ id: entity.userId });

    return {
      ...entity,
      user,
    };
  }

  async findActiveSession(accessToken: string): Promise<Session.SingleEntity> {
    const entity = await this.findOneByAccessToken(accessToken);

    if (entity.accessTokenExpiredAt < Number(new Date())) {
      throw new FastifyError('No Active Session', 404);
    }

    return entity;
  }
}
