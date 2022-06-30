import { MongoCrudService } from '~/1st-server-crud';
import { Session } from '~/api';
import { SessionModel } from '../models';

export class SessionService extends MongoCrudService<Session> {
  protected model = SessionModel;

  protected modifyListSelect = (query) => query.populate('user');

  async getByToken(token: string): Promise<Session> {
    return this.model
      .findOne()
      .where('token', token);
  }
}
