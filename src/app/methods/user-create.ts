import { mapUserCreateParamsRaw, UserCreateParamsRaw, UserCreateResultRaw } from '~/api';
import { useUserService } from '../di';

export async function userCreate(paramsRaw: UserCreateParamsRaw): Promise<UserCreateResultRaw> {
  const params = mapUserCreateParamsRaw(paramsRaw);
  const userService = useUserService();
  await userService.create(params.data);
  return null;
}
