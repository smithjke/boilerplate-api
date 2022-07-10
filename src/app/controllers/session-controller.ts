import { ApiParams } from '~/1st-api';
import { CrudController } from '~/1st-server-crud';
import { mapSession, mapSessionRaw, Permission, Session, SessionRaw } from '~/api';
import { useGuardService, useSessionService } from '../di';

export class SessionController extends CrudController<Session, SessionRaw> {
  private permissions: Record<string, Array<Permission>> = {
    create: [Permission.SESSION__WRITE],
    update: [Permission.SESSION__WRITE],
    delete: [Permission.SESSION__WRITE],
    list: [Permission.SESSION__READ],
    get: [Permission.SESSION__READ],
    getByToken: [Permission.SESSION__READ],
  };

  protected crudService = useSessionService();

  protected mapModel = mapSession;

  protected mapModelRaw = mapSessionRaw;

  async beforeAction(params, method): Promise<void> {
    await useGuardService().check(params, this.permissions[method]);
  }

  async getByToken(paramsRaw: ApiParams<void, { token: string; }>): Promise<SessionRaw> {
    const { token } = paramsRaw.query;
    const result = await this.crudService.getByToken(token);
    return this.mapModel(result);
  }
}
