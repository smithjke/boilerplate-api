import { getDependency } from '@smithjke/2p-core/di';
import { Repository } from './repository';
import { Service } from './service';

export const usePageService = () => getDependency<Service>('PAGE_SERVICE');
export const usePageRepository = () => getDependency<Repository>('PAGE_REPOSITORY');
