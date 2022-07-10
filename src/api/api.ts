import { createApi } from '~/1st-api';
import {
  AuthClient,
  RoleRestClient,
  SessionRestClient,
  UserRestClient,
} from './clients';

export const api = createApi({
  auth: new AuthClient(),
  role: new RoleRestClient(),
  session: new SessionRestClient(),
  user: new UserRestClient(),
});
