import { ApiParams } from '~/1st-api';
import { useAuthService } from '../di';
import { Permission } from '../common';

export class GuardService {
  private authService = useAuthService();

  async check(params: ApiParams, permissions?: Array<Permission>): Promise<void> {
    const session = await this.authService.getSession(params.token);
    const userPermissions = this.authService.getPermissions(session.user.roles);
    // console.log('GuardService.check params >>>', params);
    // console.log('GuardService.check session >>>', session);
    // console.log('GuardService.check session.user >>>', session.user);
    // console.log('GuardService.check session.user.roles >>>', session.user.roles);
    // console.log('GuardService.check permissions >>>', permissions);
    // console.log('GuardService.check userPermissions >>>', userPermissions);
    if (userPermissions[Permission.ROOT]) {
      return;
    }
    if (Array.isArray(permissions)) {
      if (!permissions.length) {
        return;
      }
      if (permissions.find((permission) => userPermissions[permission])) {
        return;
      }
    }
    throw new Error('No access');
  }
}
