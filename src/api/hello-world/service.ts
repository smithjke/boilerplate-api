import { ApiConfig } from '~/2p-core/api';
import { CrudAxiosService, CrudService } from '~/2p-core/crud';
import {
  CreateEntity,
  Entity,
  EntityCrudType,
  EntityKey,
  UpdateEntity,
  entity,
  listedEntity,
} from './entity';

export interface EntityService extends CrudService<EntityCrudType> {
  doBarrelRoll: (data: UpdateEntity, params: EntityKey) => Promise<Entity>;
  superCreate: (data: CreateEntity) => Promise<Entity>;
}

export const entityApiConfig: ApiConfig<EntityService, CrudService<EntityCrudType>> = {
  doBarrelRoll: {
    method: 'PUT',
    url: '/:id/do-barrel-roll',
  },
  superCreate: {
    method: 'POST',
    url: '/super-create',
  },
};

export class EntityAxiosService extends CrudAxiosService<EntityCrudType> implements EntityService {
  protected entity = entity;

  protected listedEntity = listedEntity;

  async doBarrelRoll(data: UpdateEntity, params: EntityKey): Promise<Entity> {
    return this.request({
      ...entityApiConfig.doBarrelRoll,
      params,
      data,
    }, this.validateEntity);
  }

  async superCreate(data: CreateEntity): Promise<Entity> {
    return this.request({
      ...entityApiConfig.superCreate,
      data,
    }, this.validateEntity);
  }
}
