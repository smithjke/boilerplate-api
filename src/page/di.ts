import { getDependency } from '@smithjke/2p-core/di';
import { createRepository } from './mock';
import { Service } from './service';

export const usePageService = () => getDependency<Service>('PAGE_SERVICE');
export const usePageRepository = () => getDependency<ReturnType<typeof createRepository>>('PAGE_REPOSITORY');
