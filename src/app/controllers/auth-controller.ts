import { ApiParams } from '~/1st-api';
import { BaseController } from '~/1st-server-api';
import { AuthInitResultRaw, AuthLoginDataRaw, mapAuthLoginData } from '~/api';
import { useAuthService } from '~/app';

export class AuthController extends BaseController {
  private authService = useAuthService();

  async login(paramsRaw: ApiParams<AuthLoginDataRaw>): Promise<string> {
    const data = mapAuthLoginData(paramsRaw.data);
    return this.authService.login(data.login, data.password);
  }

  async init(paramsRaw: ApiParams): Promise<AuthInitResultRaw> {
    const init = await this.authService.getInit(paramsRaw.token);
    if (init?.user && init?.session) {
      return {
        user: {
          id: init.user.id,
          name: init.user.name,
          roles: init.user.roles.map((role) => ({
            name: role.name,
          })),
        },
        permissions: init.permissions,
      };
    }
    throw new Error('Not auth');
  }
}
