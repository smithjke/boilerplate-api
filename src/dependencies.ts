import { registerDependency } from '@smithjke/2p-core/di';
import * as Auth from '~/auth';
import * as Page from '~/page';
import * as Session from '~/session';
import * as User from '~/user';

export function registerDependencies(): void {
  registerDependency('AUTH_SERVICE', () => new Auth.Service());
  registerDependency('PAGE_REPOSITORY', Page.createRepository);
  registerDependency('PAGE_SERVICE', () => new Page.Service());
  registerDependency('USER_REPOSITORY', User.createRepository);
  registerDependency('USER_SERVICE', () => new User.Service());
  registerDependency('SESSION_REPOSITORY', Session.createRepository);
  registerDependency('SESSION_SERVICE', () => new Session.Service());
}
