import TPCore from '~/2p-core';
import { Service } from './service';

export const useHelloWorldService = () => TPCore.di.getDependency<Service>('HELLO_WORLD_SERVICE');
