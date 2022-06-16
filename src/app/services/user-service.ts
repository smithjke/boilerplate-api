import { MongoCrudService } from '~/1st-server-crud';
import { User } from '~/api';
import { UserModel } from '../models';

export class UserService extends MongoCrudService<User> {
  protected model = UserModel;

  async getByName(name: string): Promise<User> {
    return this.model
      .findOne()
      .where('name', name);
  }

  isActive(user: User): boolean {
    // @todo check ban

    return Boolean(user);
  }
}
