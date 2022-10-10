import { getDependency } from '@smithjke/2p-core/di';
import { createRepository } from './mock';
import { Service } from './service';

export const useSessionService = () => getDependency<Service>('SESSION_SERVICE');
export const useSessionRepository = () => getDependency<ReturnType<typeof createRepository>>('SESSION_REPOSITORY');
