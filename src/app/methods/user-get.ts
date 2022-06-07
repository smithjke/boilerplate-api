import { mapUserGetParamsRaw, mapUserGetResult, UserGetParamsRaw, UserGetResultRaw } from '~/api';
import { useUserService } from '../di';

export async function userGet(paramsRaw: UserGetParamsRaw): Promise<UserGetResultRaw> {
  const params = mapUserGetParamsRaw(paramsRaw);
  const { id } = params.query;
  const userService = useUserService();
  const user = await userService.get({ id });
  return mapUserGetResult(user);
}
