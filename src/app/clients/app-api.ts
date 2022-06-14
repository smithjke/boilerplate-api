import { createApi } from '~/1st-api';
import { AppAuthClient } from './app-auth-client';
import { AppUserRestClient } from './app-user-rest-client';
import { AppSessionRestClient } from './app-session-rest-client';

export const appApi = createApi({
  auth: new AppAuthClient(),
  user: new AppUserRestClient(),
  session: new AppSessionRestClient(),
});
