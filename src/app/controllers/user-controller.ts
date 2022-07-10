import { CrudController } from '~/1st-server-crud';
import { mapUser, mapUserRaw, Permission, User, UserRaw } from '~/api';
import { useGuardService, useUserService } from '../di';

export class UserController extends CrudController<User, UserRaw> {
  private permissions: Record<string, Array<Permission>> = {
    create: [Permission.USER__WRITE],
    update: [Permission.USER__WRITE],
    delete: [Permission.USER__WRITE],
    list: [Permission.USER__READ],
    get: [Permission.USER__READ],
  };

  protected crudService = useUserService();

  protected mapModel = mapUser;

  protected mapModelRaw = mapUserRaw;

  async beforeAction(params, method): Promise<void> {
    await useGuardService().check(params, this.permissions[method]);
  }
}
