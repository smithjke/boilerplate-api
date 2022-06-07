import { mapUserListParams, mapUserListResult, UserListParamsRaw, UserListResultRaw } from '~/api';
import { useUserService } from '../di';

export async function userList(paramsRaw: UserListParamsRaw): Promise<UserListResultRaw> {
  const params = mapUserListParams(paramsRaw);
  const userService = useUserService();
  const result = await userService.list(params.query);
  return mapUserListResult(result);
}
