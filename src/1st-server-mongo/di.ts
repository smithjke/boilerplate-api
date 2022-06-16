import { getDependency } from '~/1st-di';
import { MongoService } from './services';

export const useMongoService = () => getDependency<MongoService>('MONGO_SERVICE');
