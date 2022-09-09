import TPCore from '~/2p-core';
import { MongoService } from '~/1st-server-mongo';
import {
  AuthService,
  GuardService,
  RoleService,
  SessionService,
  UserService,
} from '~/app';
import HelloWorld from '~/hello-world';

export function registerDependencies(): void {
  TPCore.di.registerDependency('MONGO_SERVICE', () => new MongoService());
  TPCore.di.registerDependency('AUTH_SERVICE', () => new AuthService());
  TPCore.di.registerDependency('GUARD_SERVICE', () => new GuardService());
  TPCore.di.registerDependency('ROLE_SERVICE', () => new RoleService());
  TPCore.di.registerDependency('SESSION_SERVICE', () => new SessionService());
  TPCore.di.registerDependency('USER_SERVICE', () => new UserService());
  TPCore.di.registerDependency('HELLO_WORLD_SERVICE', () => new HelloWorld.Service());
}
