import { CrudFastifyService } from '@smithjke/2p-server/crud';
import { User } from '@smithjke/boilerplate-schema';
import { useUserRepository } from './di';

export class Service extends CrudFastifyService<User.EntityCrudType> implements User.Service {
  protected repository = useUserRepository();
}
