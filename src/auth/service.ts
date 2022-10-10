import { Auth } from '@smithjke/boilerplate-schema';

export class Service implements Auth.Service {
  async login(data: Auth.Login): Promise<Auth.Result> {
    throw new Error('Not Implemented');
  }

  async refresh(data: Auth.Refresh): Promise<Auth.Result> {
    throw new Error('Not Implemented');
  }
}
