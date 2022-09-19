import TPCore from '~/2p-core';
import { MongoService } from '~/2p-server/mongo';
import HelloWorld from '~/hello-world';

export function registerDependencies(): void {
  TPCore.di.registerDependency('MONGO_SERVICE', () => new MongoService());
  TPCore.di.registerDependency('HELLO_WORLD_SERVICE', () => new HelloWorld.Service());
}
