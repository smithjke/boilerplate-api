import {
  mapUser,
  mapUserRaw,
  User,
  UserRaw,
} from '~/api';
import { CrudRestClient } from '~/1st-crud';

export class UserRestClient extends CrudRestClient<User, UserRaw> {
  protected url = '/api';

  protected mapModel = mapUser;

  protected mapModelRaw = mapUserRaw;

  // async create(params: UserCreateParams): Promise<UserCreateResult> {
  //   return this.fetch({
  //     method: 'post',
  //     endpoint: '/user/create',
  //     body: mapUserCreateParams(params).data,
  //     mapResult: mapUserCreateResultRaw,
  //   });
  // }
  //
  // async get(params: UserGetParams): Promise<UserGetResult> {
  //   const paramsRaw = mapUserGetParams(params);
  //
  //   return this.fetch({
  //     method: 'get',
  //     endpoint: `/user/${paramsRaw.query.id}`,
  //     body: paramsRaw.data,
  //     mapResult: mapUserGetResultRaw,
  //   });
  // }
  //
  // async list(params: UserListParams): Promise<UserListResult> {
  //   const paramsRaw = mapUserListParams(params);
  //
  //   return this.fetch({
  //     method: 'get',
  //     endpoint: `/user?${paramsRaw.query ? makeQueryString(paramsRaw.query) : void 0}`,
  //     mapResult: mapUserListResultRaw,
  //   });
  // }
}
