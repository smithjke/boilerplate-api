import { registerDependency } from '@smithjke/2p-core/di';
import * as Auth from '~/auth';
import * as Page from '~/page';
import * as Session from '~/session';
import * as User from '~/user';

export function registerDependencies(): void {
  // SINGLETON
  registerDependency('PAGE_REPOSITORY', Page.createRepository);
  registerDependency('USER_REPOSITORY', User.createRepository);
  registerDependency('SESSION_REPOSITORY', Session.createRepository);
  // FACTORY
  registerDependency('AUTH_SERVICE', () => new Auth.Service(), 'factory');
  registerDependency('PAGE_SERVICE', () => new Page.Service(), 'factory');
  registerDependency('USER_SERVICE', () => new User.Service(), 'factory');
  registerDependency('SESSION_SERVICE', () => new Session.Service(), 'factory');
}
