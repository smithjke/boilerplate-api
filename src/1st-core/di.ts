import { getDependency } from '~/1st-di';
import { StorageRepository } from './repositories';

export const useStorageRepository = () => getDependency<StorageRepository>('STORAGE_REPOSITORY');
