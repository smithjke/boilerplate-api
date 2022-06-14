import { ApiParams } from '~/1st-api';
import { CrudController } from '~/1st-crud-server';
import { mapSession, mapSessionRaw, Session, SessionRaw } from '~/api';
import { SessionService } from '../services';
import { useSessionService } from '../di';

export class SessionController extends CrudController<Session, SessionRaw> {
  protected crudService: SessionService = useSessionService();

  protected mapModel = mapSession;

  protected mapModelRaw = mapSessionRaw;

  async getByToken(params: ApiParams): Promise<Partial<SessionRaw>> {
    const { token } = params.query;
    const result = await this.crudService.getByToken(token);
    return this.mapModel(result);
  }
}
