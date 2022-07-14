import { ApiError, ApiErrorCode, ApiParams } from '~/1st-api';
import { Permission } from '~/api';
import { useAuthService } from '../di';

export class GuardService {
  private authService = useAuthService();

  async check(params: ApiParams, permissions?: Array<Permission>): Promise<void> {
    if (Array.isArray(permissions) && !permissions.length) return;

    const session = await this.authService.getSession(params.token);
    const userPermissionRecord = this.authService.getPermissionRecord(session.user.roles);

    if (userPermissionRecord[Permission.ROOT]) return;

    if (Array.isArray(permissions) && permissions.find((permission) => userPermissionRecord[permission])) return;

    throw new ApiError('Forbidden', ApiErrorCode.FORBIDDEN);
  }
}
