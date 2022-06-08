import { RestClient } from '~/1st-rest';
import {
  AuthLoginParams,
  AuthLoginResult,
  mapAuthLoginParams,
  mapAuthLoginResultRaw,
} from '../schema';

export class AuthClient extends RestClient {
  protected url = '/api';

  login(params: AuthLoginParams): Promise<AuthLoginResult> {
    return this.fetch({
      method: 'post',
      endpoint: '/auth/login',
      body: mapAuthLoginParams(params).data,
      mapResult: mapAuthLoginResultRaw,
      type: 'text',
    });
  }
}
