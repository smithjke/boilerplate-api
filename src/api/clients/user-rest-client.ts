import { RestClient } from '~/1st-rest';
import {
  mapUserCreateParams,
  mapUserCreateResultRaw,
  mapUserGetParams,
  mapUserGetResultRaw,
  mapUserListParams,
  mapUserListResultRaw,
  UserCreateParams,
  UserCreateResult,
  UserGetParams,
  UserGetResult,
  UserListParams,
  UserListResult,
} from '~/api';
import { makeQueryString } from '~/1st-utils';

export class UserRestClient extends RestClient {
  async create(params: UserCreateParams): Promise<UserCreateResult> {
    return this.fetch({
      method: 'post',
      endpoint: '/user/create',
      body: mapUserCreateParams(params).data,
      mapResult: mapUserCreateResultRaw,
    });
  }

  async get(params: UserGetParams): Promise<UserGetResult> {
    const paramsRaw = mapUserGetParams(params);

    return this.fetch({
      method: 'get',
      endpoint: `/user/${paramsRaw.query.id}`,
      body: paramsRaw.data,
      mapResult: mapUserGetResultRaw,
    });
  }

  async list(params: UserListParams): Promise<UserListResult> {
    const paramsRaw = mapUserListParams(params);

    return this.fetch({
      method: 'get',
      endpoint: `/user?${paramsRaw.query ? makeQueryString(paramsRaw.query) : void 0}`,
      mapResult: mapUserListResultRaw,
    });
  }
}
