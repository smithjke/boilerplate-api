import { TypeCompiler } from '@sinclair/typebox/compiler';
import TPCore from '~/2p-core';
import * as Entity from './entity';

export interface EntityService {
  login(data: Entity.Login): Promise<Entity.Result>;
  refresh(data: Entity.Refresh): Promise<Entity.Result>;
}

export const entityConfig: TPCore.api.ApiConfig<EntityService> = {
  login: {
    method: 'POST',
    url: '/login',
  },
  refresh: {
    method: 'POST',
    url: '/login',
  },
};

export class EntityAxiosService extends TPCore.api.AxiosService implements EntityService {
  private validateResult = TypeCompiler.Compile(Entity.result);

  async login(data: Entity.Login): Promise<Entity.Result> {
    return this.request({
      ...entityConfig.login,
      data,
    }, this.validateResult);
  }

  refresh(data: Entity.Refresh): Promise<Entity.Result> {
    return this.request({
      ...entityConfig.refresh,
      data,
    }, this.validateResult);
  }
}
