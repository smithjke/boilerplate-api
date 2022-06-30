import { CrudRestClient } from '~/1st-crud';
import {
  mapUser,
  mapUserRaw,
  User,
  UserRaw,
} from '../schema';

export class UserRestClient extends CrudRestClient<User, UserRaw> {
  protected url = '/api/user';

  protected mapModel = mapUser;

  protected mapModelRaw = mapUserRaw;
}
