import { CrudRestClient } from '~/1st-crud';
import {
  mapSession,
  mapSessionRaw,
  Session,
  SessionRaw,
} from '../schema';
import { ApiParams } from '~/1st-api';

export class SessionRestClient extends CrudRestClient<Session, SessionRaw> {
  protected url = '/api/session';

  protected mapModel = mapSession;

  protected mapModelRaw = mapSessionRaw;

  getByToken(params: ApiParams<void, { token: string; }>): Promise<Partial<Session>> {
    const { token } = params.query;
    return this.fetch({
      method: 'get',
      endpoint: `/token/${token}`,
      mapResult: this.mapModelRaw,
    });
  }
}
