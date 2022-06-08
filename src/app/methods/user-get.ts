import { mapUserGetParamsRaw, mapUserGetResult, UserGetParamsRaw, UserGetResultRaw } from '~/api';
import { useAuthService, useUserService } from '../di';
import { Permission } from '../common';

export async function userGet(paramsRaw: UserGetParamsRaw): Promise<UserGetResultRaw> {
  const authService = useAuthService();
  const userService = useUserService();

  const params = mapUserGetParamsRaw(paramsRaw);
  const sessionData = await authService.read(params.token, Permission.USER_CREATE);

  console.log('userGet sessionData.user >>>', sessionData.user);

  const { id } = params.query;
  const user = await userService.get(id);

  return mapUserGetResult(user);
}
