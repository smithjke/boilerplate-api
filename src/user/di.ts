import { getDependency } from '@smithjke/2p-core/di';
import { createRepository } from './mock';
import { Service } from './service';

export const useUserService = () => getDependency<Service>('USER_SERVICE');
export const useUserRepository = () => getDependency<ReturnType<typeof createRepository>>('USER_REPOSITORY');
