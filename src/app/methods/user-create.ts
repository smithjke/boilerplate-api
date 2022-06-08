import { mapUserCreateParamsRaw, UserCreateParamsRaw, UserCreateResultRaw } from '~/api';
import { useAuthService, useUserService } from '../di';
import { Permission } from '../common';

export async function userCreate(paramsRaw: UserCreateParamsRaw): Promise<UserCreateResultRaw> {
  const authService = useAuthService();
  const userService = useUserService();

  const params = mapUserCreateParamsRaw(paramsRaw);
  const sessionData = await authService.read(params.token, Permission.USER_CREATE);

  console.log('userCreate sessionData.user >>>', sessionData.user);

  await userService.create(params.data);

  return null;
}
