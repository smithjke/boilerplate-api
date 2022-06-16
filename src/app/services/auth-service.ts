import { randomString } from '~/1st-core';
import { Session, User } from '~/api';
import { Permission } from '../common';
import { usePermissionService, useSessionService, useUserService } from '../di';
import { PermissionService } from './permission-service';
import { SessionService } from './session-service';
import { UserService } from './user-service';

export type SessionData = {
  session: Session;
  user: User;
};

export class AuthService {
  private readonly permissionService: PermissionService;

  private readonly sessionService: SessionService;

  private readonly userService: UserService;

  constructor() {
    this.permissionService = usePermissionService();
    this.sessionService = useSessionService();
    this.userService = useUserService();
  }

  async read(token: string, permission?: Permission): Promise<SessionData> {
    const session = await this.sessionService.getByToken(token);

    if (!session) {
      throw new Error('No session');
    }

    const user = await this.userService.get(session.userId);

    if (!user) {
      throw new Error('No user');
    }

    if (!this.userService.isActive(user)) {
      throw new Error('User is not active');
    }

    if (permission) {
      const permissionCheckResult = await this.permissionService.check(user, permission);

      if (!permissionCheckResult) {
        throw new Error('Access denied');
      }
    }

    return {
      session,
      user,
    };
  }

  async login(name: string, password: string): Promise<string> {
    const user = await this.userService.getByName(name);

    // @todo check password hash
    if (!user || user.password !== password) {
      throw new Error('Incorrect data');
    }

    const session = await this.sessionService.create({
      token: randomString(32),
      // @todo real ip
      ip: '0.0.0.0',
      userId: user.id,
    });

    return session.token;
  }
}
