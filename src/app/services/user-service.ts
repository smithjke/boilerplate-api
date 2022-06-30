import { MongoCrudService } from '~/1st-server-crud';
import { User } from '~/api';
import { UserModel } from '../models';
import { useRoleService } from '../di';

export class UserService extends MongoCrudService<User> {
  private roleService = useRoleService();

  protected model = UserModel;

  protected modifyListSelect = (query) => query.populate('roles');

  async getByName(name: string): Promise<User> {
    return this.model
      .findOne()
      .where('name', name);
  }

  async getWithRoles(id: string): Promise<User> {
    return this.model
      .findOne()
      .populate('roles')
      .where('_id', id);
  }

  async init(): Promise<void> {
    const total = await this.model.count();
    if (!total) {
      const role = await this.roleService.create({
        name: 'Root',
        permissions: 'ROOT',
      })
      await this.create({
        name: 'admin',
        password: 'admin',
        rolesIds: [role.id],
      });
    }
  }

  isActive(user: User): boolean {
    // @todo check ban

    return Boolean(user);
  }
}
