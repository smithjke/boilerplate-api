import TPCore from '~/2p-core';
import {
  AuthService,
  GuardService,
  RoleService,
  SessionService,
  UserService,
} from './services';

export const useAuthService = () => TPCore.di.getDependency<AuthService>('AUTH_SERVICE');
export const useGuardService = () => TPCore.di.getDependency<GuardService>('GUARD_SERVICE');
export const useRoleService = () => TPCore.di.getDependency<RoleService>('ROLE_SERVICE');
export const useSessionService = () => TPCore.di.getDependency<SessionService>('SESSION_SERVICE');
export const useUserService = () => TPCore.di.getDependency<UserService>('USER_SERVICE');
