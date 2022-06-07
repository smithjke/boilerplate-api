import { getDependency } from '~/1st-di';
import { UserService } from './services';

export const useUserService = () => getDependency<UserService>('USER_SERVICE');
