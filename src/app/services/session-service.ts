import { MongoCrudService } from '~/1st-crud-server';
import { Session } from '~/api';
import { SessionModel } from '../models';

export class SessionService extends MongoCrudService<Session> {
  protected model = SessionModel;

  async getByToken(token: string): Promise<Session> {
    return this.model
      .findOne()
      .where('token', token);
  }
}
