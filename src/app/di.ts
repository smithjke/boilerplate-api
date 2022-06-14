import { getDependency } from '~/1st-di';
import { SessionController, UserController } from './controllers';
import {
  AuthService,
  PermissionService,
  SessionService,
  UserService,
} from './services';

export const useSessionController = () => getDependency<SessionController>('SESSION_CONTROLLER');
export const useUserController = () => getDependency<UserController>('USER_CONTROLLER');

export const useAuthService = () => getDependency<AuthService>('AUTH_SERVICE');
export const usePermissionService = () => getDependency<PermissionService>('PERMISSION_SERVICE');
export const useSessionService = () => getDependency<SessionService>('SESSION_SERVICE');
export const useUserService = () => getDependency<UserService>('USER_SERVICE');
