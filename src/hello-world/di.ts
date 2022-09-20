import { getDependency } from '~/2p-core/di';
import { Service } from './service';

export const useHelloWorldService = () => getDependency<Service>('HELLO_WORLD_SERVICE');
