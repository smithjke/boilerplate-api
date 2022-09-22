import { TypeCompiler } from '@sinclair/typebox/compiler';
import { ApiConfig, AxiosService } from '~/2p-core/api';
import {
  Login,
  Refresh,
  result,
  Result,
} from './entity';

export interface EntityService {
  login(data: Login): Promise<Result>;
  refresh(data: Refresh): Promise<Result>;
}

export const entityConfig: ApiConfig<EntityService> = {
  login: {
    method: 'POST',
    url: '/login',
  },
  refresh: {
    method: 'POST',
    url: '/refresh',
  },
};

export class EntityAxiosService extends AxiosService implements EntityService {
  private validateResult = TypeCompiler.Compile(result);

  async login(data: Login): Promise<Result> {
    return this.request({
      ...entityConfig.login,
      data,
    }, this.validateResult);
  }

  async refresh(data: Refresh): Promise<Result> {
    return this.request({
      ...entityConfig.refresh,
      data,
    }, this.validateResult);
  }
}
