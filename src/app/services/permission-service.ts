import { User } from '~/api';
import { Permission } from '../common';

export class PermissionService {
  async check(user: User, permission: Permission): Promise<boolean> {
    console.log('PermissionService check >>>', user.name, permission);
    return Boolean(user);
  }
}
