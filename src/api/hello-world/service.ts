import TPCore from '~/2p-core';
import * as Entity from './entity';

export type EntityCrudService = TPCore.crud.CrudService<
  Entity.Entity,
  Entity.CreateEntity,
  Entity.UpdateEntity,
  Entity.ListedEntity,
  Entity.EntityKey,
  Entity.EntityOrderField,
  Entity.EntityFilter>;

export abstract class EntityCrudAxiosService extends TPCore.crud.CrudAxiosService<
  Entity.Entity,
  Entity.CreateEntity,
  Entity.UpdateEntity,
  Entity.ListedEntity,
  Entity.EntityKey,
  Entity.EntityOrderField,
  Entity.EntityFilter> {}

export interface EntityService extends EntityCrudService {
  doBarrelRoll: (data: Entity.UpdateEntity, params: Entity.EntityKey) => Promise<Entity.Entity>;
  superCreate: (data: Entity.CreateEntity) => Promise<Entity.Entity>;
}

export const entityApiConfig: TPCore.api.ApiConfig<EntityService, EntityCrudService> = {
  doBarrelRoll: {
    method: 'PUT',
    url: '/:id/do-barrel-roll',
  },
  superCreate: {
    method: 'POST',
    url: '/super-create',
  },
};

export class EntityAxiosService extends EntityCrudAxiosService implements EntityService {
  protected entity = Entity.entity;

  protected listedEntity = Entity.listedEntity;

  async doBarrelRoll(data: Entity.UpdateEntity, params: Entity.EntityKey): Promise<Entity.Entity> {
    return this.request({
      ...entityApiConfig.doBarrelRoll,
      params,
      data,
    }, this.validateEntity);
  }

  async superCreate(data: Entity.CreateEntity): Promise<Entity.Entity> {
    return this.request({
      ...entityApiConfig.superCreate,
      data,
    }, this.validateEntity);
  }
}
