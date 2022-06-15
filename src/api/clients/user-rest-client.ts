import {
  mapUser,
  mapUserRaw,
  User,
  UserRaw,
} from '../schema';
import { CrudRestClient } from '~/1st-crud';

export class UserRestClient extends CrudRestClient<User, UserRaw> {
  protected url = '/api/user';

  protected mapModel = mapUser;

  protected mapModelRaw = mapUserRaw;
}
