import { getDependency } from '~/1st-di';
import {
  AuthService,
  GuardService,
  RoleService,
  SessionService,
  UserService,
} from './services';

export const useAuthService = () => getDependency<AuthService>('AUTH_SERVICE');
export const useGuardService = () => getDependency<GuardService>('GUARD_SERVICE');
export const useRoleService = () => getDependency<RoleService>('ROLE_SERVICE');
export const useSessionService = () => getDependency<SessionService>('SESSION_SERVICE');
export const useUserService = () => getDependency<UserService>('USER_SERVICE');
