import { CrudController } from '~/1st-crud-server';
import { mapUser, mapUserRaw, User, UserRaw } from '~/api';
import { useUserService } from '../di';

export class UserController extends CrudController<User, UserRaw> {
  protected crudService = useUserService();

  protected mapModel = mapUser;

  protected mapModelRaw = mapUserRaw;
}
