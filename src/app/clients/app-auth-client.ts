import { AuthClient } from '~/api';

export class AppAuthClient extends AuthClient {
  protected url = 'http://localhost:3000/api';
}
