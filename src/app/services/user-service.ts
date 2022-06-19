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

  async init(): Promise<void> {
    const total = await this.model.count();
    if (!total) {
      await this.create({
        name: 'admin',
        password: 'admin',
      });
    }
  }

  isActive(user: User): boolean {
    // @todo check ban

    return Boolean(user);
  }
}
