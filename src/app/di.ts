import { getDependency } from '~/1st-di';
import {
  AuthService,
  PermissionService,
  SessionService,
  UserService,
} from './services';

export const useAuthService = () => getDependency<AuthService>('AUTH_SERVICE');
export const usePermissionService = () => getDependency<PermissionService>('PERMISSION_SERVICE');
export const useSessionService = () => getDependency<SessionService>('SESSION_SERVICE');
export const useUserService = () => getDependency<UserService>('USER_SERVICE');
