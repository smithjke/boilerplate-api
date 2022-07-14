import { ApiError, ApiErrorCode, ApiParams } from '~/1st-api';
import { Permission } from '~/api';
import { useAuthService } from '../di';

export class GuardService {
  private authService = useAuthService();

  async check(params: ApiParams, permissions?: Array<Permission>): Promise<void> {
    const session = await this.authService.getSession(params.token);
    const userPermissionRecord = this.authService.getPermissionRecord(session.user.roles);

    // console.log('GuardService.check params >>>', params);
    // console.log('GuardService.check session >>>', session);
    // console.log('GuardService.check session.user >>>', session.user);
    // console.log('GuardService.check session.user.roles >>>', session.user.roles);
    // console.log('GuardService.check permissions >>>', permissions);
    // console.log('GuardService.check userPermissions >>>', userPermissions);

    if (userPermissionRecord[Permission.ROOT]) {
      return;
    }

    if (Array.isArray(permissions)) {
      if (!permissions.length) {
        return;
      }
      if (permissions.find((permission) => userPermissionRecord[permission])) {
        return;
      }
    }

    throw new ApiError('Forbidden', ApiErrorCode.FORBIDDEN);
  }
}
