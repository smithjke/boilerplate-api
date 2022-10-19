import { CrudFastifyService } from '@smithjke/2p-server/crud';
import { Page } from '@smithjke/boilerplate-schema';
import { usePageRepository } from './di';

export class Service extends CrudFastifyService<Page.EntityCrudType> implements Page.Service {
  protected repository = usePageRepository();
}
