import { appApi } from '../clients/app-api';

export async function testRequest(params: object): Promise<object> {
  const login = await appApi.auth.login({
    data: params['data'],
  });

  const users = await appApi.user.list({});

  return {
    kek: 'lol-123',
    params,
    login,
    users,
  };
}
