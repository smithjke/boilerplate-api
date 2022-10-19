import { CrudRepository } from '@smithjke/2p-server/crud';
import { Page } from '@smithjke/boilerplate-schema';

export interface Repository extends CrudRepository<Page.Entity> {}
