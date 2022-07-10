import { CrudController } from '~/1st-server-crud';
import { mapRole, mapRoleRaw, Permission, Role, RoleRaw } from '~/api';
import { useGuardService, useRoleService } from '../di';

export class RoleController extends CrudController<Role, RoleRaw> {
  private permissions: Record<string, Array<Permission>> = {
    create: [Permission.ROLE__WRITE],
    update: [Permission.ROLE__WRITE],
    delete: [Permission.ROLE__WRITE],
    list: [Permission.ROLE__READ],
    get: [Permission.ROLE__READ],
  };

  protected crudService = useRoleService();

  protected mapModel = mapRole;

  protected mapModelRaw = mapRoleRaw;

  async beforeAction(params, method): Promise<void> {
    await useGuardService().check(params, this.permissions[method]);
  }
}
