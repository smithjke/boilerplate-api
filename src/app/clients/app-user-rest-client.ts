import { UserRestClient } from '~/api';

export class AppUserRestClient extends UserRestClient {
  protected url = 'http://localhost:3000/api';

  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return {
      ...headers,
      ['session-token']: 'W6ri6GULzqyZMDnrtmd0UuLXDics3TSn',
    };
  }
}
