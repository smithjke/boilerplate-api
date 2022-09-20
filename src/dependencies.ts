import { registerDependency } from '~/2p-core/di';
import HelloWorld from '~/hello-world';

export function registerDependencies(): void {
  registerDependency('HELLO_WORLD_SERVICE', () => new HelloWorld.Service());
}
