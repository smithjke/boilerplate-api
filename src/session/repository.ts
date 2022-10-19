import { CrudRepository } from '@smithjke/2p-server/crud';
import { Session } from '@smithjke/boilerplate-schema';

export interface Repository extends CrudRepository<Session.Entity> {}
