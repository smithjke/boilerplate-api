import { ApiParams } from '~/1st-api';
import { BaseController } from '~/1st-api-server';
import { AuthLoginDataRaw, mapAuthLoginData } from '~/api';
import { useAuthService } from '~/app';

export class AuthController extends BaseController {
  private authService = useAuthService();

  async login(paramsRaw: ApiParams<Partial<AuthLoginDataRaw>>): Promise<string> {
    const data = mapAuthLoginData(paramsRaw.data);
    return this.authService.login(data.login, data.password);
  }
}
