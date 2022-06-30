import { MongoCrudService } from '~/1st-server-crud';
import { Role } from '~/api';
import { RoleModel } from '../models';

export class RoleService extends MongoCrudService<Role> {
  protected model = RoleModel;
}
