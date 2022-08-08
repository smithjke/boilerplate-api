import { registerDependency } from '~/1st-di';
import { MongoService } from '~/1st-server-mongo';
import {
  AuthService,
  GuardService,
  RoleService,
  SessionService,
  UserService,
} from '~/app';

export function registerDependencies(): void {
  registerDependency('MONGO_SERVICE', () => new MongoService());
  registerDependency('AUTH_SERVICE', () => new AuthService());
  registerDependency('GUARD_SERVICE', () => new GuardService());
  registerDependency('ROLE_SERVICE', () => new RoleService());
  registerDependency('SESSION_SERVICE', () => new SessionService());
  registerDependency('USER_SERVICE', () => new UserService());
}
