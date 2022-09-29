import { createApi } from '2p-core/api';
import { EntityAxiosService as Auth } from './auth';
import { EntityCrudAxiosService as HelloWorld } from './hello-world';

export const api = createApi({
  auth: new Auth('/auth'),
  helloWorld: new HelloWorld('/hello-world'),
});
