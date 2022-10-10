import { getDependency } from '@smithjke/2p-core/di';
import { Service } from './service';

export const useAuthService = () => getDependency<Service>('AUTH_SERVICE');
