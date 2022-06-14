import {
  mapUser,
  mapUserRaw,
  User,
  UserRaw,
} from '~/api';
import { CrudRestClient } from '~/1st-crud';

export class UserRestClient extends CrudRestClient<User, UserRaw> {
  protected url = '/api/user';

  protected mapModel = mapUser;

  protected mapModelRaw = mapUserRaw;
}
