import { getDependency } from '@smithjke/2p-core/di';
import { Repository } from './repository';
import { Service } from './service';

export const useSessionService = () => getDependency<Service>('SESSION_SERVICE');
export const useSessionRepository = () => getDependency<Repository>('SESSION_REPOSITORY');
