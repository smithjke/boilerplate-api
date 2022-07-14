import { ApiError, ApiErrorCode } from '~/1st-api';
import { randomString } from '~/1st-core';
import { AuthInitResult, Permission, Role, Session } from '~/api';
import { useSessionService, useUserService } from '../di';
import { SessionService } from './session-service';
import { UserService } from './user-service';

export class AuthService {
  private readonly sessionService: SessionService;

  private readonly userService: UserService;

  constructor() {
    this.sessionService = useSessionService();
    this.userService = useUserService();
  }

  async getSession(token: string): Promise<Session> {
    const session = await this.sessionService.getByToken(token);

    if (!session) {
      throw new ApiError('Unauthorized', ApiErrorCode.UNAUTHORIZED);
    }

    // @todo check session lifetime

    session.user = await this.userService.getWithRoles(session.userId);

    if (!session.user) {
      throw new ApiError('Unauthorized', ApiErrorCode.UNAUTHORIZED);
    }

    if (!this.userService.isActive(session.user)) {
      throw new ApiError('Forbidden', ApiErrorCode.FORBIDDEN);
    }

    return session;
  }

  async login(name: string, password: string): Promise<string> {
    const user = await this.userService.getByName(name);

    if (!this.userService.checkPassword(user, password)) {
      throw new ApiError('Incorrect data', ApiErrorCode.UNAUTHORIZED);
    }

    const session = await this.sessionService.create({
      token: randomString(32),
      // @todo real ip
      ip: '0.0.0.0',
      userId: user.id,
    });

    return session.token;
  }

  async getInit(token: string): Promise<AuthInitResult> {
    const session = await this.getSession(token);
    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        roles: session.user.roles.map((role) => ({
          name: role.name,
        })),
      },
      permissions: Object.keys(this.getPermissionRecord(session.user.roles)),
    };
  }

  getPermissionRecord(roles: Array<Role>): Record<Permission, boolean> {
    const data = {};

    roles.forEach(
      (role) => role.permissions
        .split('|')
        .forEach((permission) => data[permission] = true)
    );

    return data as Record<Permission, boolean>;
  }
}
