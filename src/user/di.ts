import { getDependency } from '@smithjke/2p-core/di';
import { Repository } from './repository';
import { Service } from './service';

export const useUserService = () => getDependency<Service>('USER_SERVICE');
export const useUserRepository = () => getDependency<Repository>('USER_REPOSITORY');
