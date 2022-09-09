import { MongoService } from './services';
import TPCore from '~/2p-core';

export const useMongoService = () => TPCore.di.getDependency<MongoService>('MONGO_SERVICE');
