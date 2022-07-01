import { CrudRestClient } from '~/1st-crud';
import {
  mapRole,
  mapRoleRaw,
  Role,
  RoleRaw,
} from '../schema';

export class RoleRestClient extends CrudRestClient<Role, RoleRaw> {
  protected url = '/api/role';

  protected mapModel = mapRole;

  protected mapModelRaw = mapRoleRaw;
}
