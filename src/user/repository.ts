import { CrudRepository } from '@smithjke/2p-server/crud';
import { User } from '@smithjke/boilerplate-schema';

export interface Repository extends CrudRepository<User.Entity> {}
