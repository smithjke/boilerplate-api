import { mapUserListParams, mapUserListResult, UserListParamsRaw, UserListResultRaw } from '~/api';
import { Permission } from '../common';
import { useAuthService, useUserService } from '../di';

export async function userList(paramsRaw: UserListParamsRaw): Promise<UserListResultRaw> {
  const authService = useAuthService();
  const userService = useUserService();

  const params = mapUserListParams(paramsRaw);
  const sessionData = await authService.read(params.token, Permission.USER_CREATE);

  console.log('userList sessionData.user >>>', sessionData.user);

  const result = await userService.list(params.query);

  return mapUserListResult(result);
}
