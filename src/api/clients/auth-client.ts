import { ApiParams, createMapApiParams } from '~/1st-api';
import { RestClient } from '~/1st-rest';
import {
  AuthLoginData,
  mapAuthLoginData,
} from '../schema';

export class AuthClient extends RestClient {
  protected url = '/api';

  login(params: ApiParams<Partial<AuthLoginData>>): Promise<string> {
    return this.fetchText({
      method: 'post',
      endpoint: '/auth/login',
      body: createMapApiParams(mapAuthLoginData)(params).data,
    });
  }
}
