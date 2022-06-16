import { ApiParams } from '~/1st-api';
import { CrudController } from '~/1st-server-crud';
import { mapSession, mapSessionRaw, Session, SessionRaw } from '~/api';
import { SessionService } from '../services';
import { useSessionService } from '../di';

export class SessionController extends CrudController<Session, SessionRaw> {
  protected crudService: SessionService = useSessionService();

  protected mapModel = mapSession;

  protected mapModelRaw = mapSessionRaw;

  async getByToken(paramsRaw: ApiParams<void, { token: string; }>): Promise<Partial<SessionRaw>> {
    const { token } = paramsRaw.query;
    const result = await this.crudService.getByToken(token);
    return this.mapModel(result);
  }
}
