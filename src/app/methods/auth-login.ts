import { AuthLoginParamsRaw, AuthLoginResultRaw, mapAuthLoginParamsRaw, mapAuthLoginResultRaw } from '~/api';
import { useAuthService } from '../di';

export async function authLogin(paramsRaw: AuthLoginParamsRaw): Promise<AuthLoginResultRaw> {
  const authService = useAuthService();

  const params = mapAuthLoginParamsRaw(paramsRaw);
  const { login, password } = params.data;

  const token = await authService.login(login, password);

  return mapAuthLoginResultRaw(token);
}
