import CryptoJS from 'crypto-js';
import { randomString } from '~/1st-core';
import { MongoCrudService } from '~/1st-server-crud';
import { MongoUser, UserModel } from '../models';
import { useRoleService } from '../di';

export class UserService extends MongoCrudService<MongoUser> {
  private roleService = useRoleService();

  protected model = UserModel;

  protected modifyListSelect = (query) => query.populate('roles');

  async getByName(name: string): Promise<MongoUser> {
    return this.model
      .findOne()
      .where('name', name);
  }

  async getWithRoles(id: string): Promise<MongoUser> {
    return this.model
      .findOne()
      .populate('roles')
      .where('_id', id);
  }

  async create(partialData: MongoUser): Promise<MongoUser> {
    if (partialData.newPassword) {
      partialData.salt = randomString(16);
      partialData.password = String(CryptoJS.SHA256(`${partialData.newPassword}-${partialData.salt}`));
    }
    return super.create(partialData);
  }

  async update(partialData: MongoUser, id: string): Promise<MongoUser> {
    if (partialData.newPassword) {
      partialData.salt = randomString(16);
      partialData.password = String(CryptoJS.SHA256(`${partialData.newPassword}-${partialData.salt}`));
    }
    return super.update(partialData, id);
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

  checkPassword(user: MongoUser, password: string): boolean {
    if (user && !user.salt) {
      return user.password === password;
    }
    return Boolean(user && user.password === String(CryptoJS.SHA256(`${password}-${user.salt}`)));
  }

  isActive(user: MongoUser): boolean {
    // @todo check ban

    return Boolean(user);
  }
}
