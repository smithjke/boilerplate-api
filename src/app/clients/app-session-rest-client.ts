import { SessionRestClient } from '~/api';

export class AppSessionRestClient extends SessionRestClient {
  protected url = 'http://localhost:3000/api/session';
}
