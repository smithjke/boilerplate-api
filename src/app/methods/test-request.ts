import { appApi } from '../clients/app-api';

export async function testRequest(params: object): Promise<object> {
  const login = await appApi.auth.login({
    data: params['data'],
  });

  const sessionByToken = await appApi.session.getByToken({
    query: { token: '44444444' },
  });

  const sessions = await appApi.session.list({});

  return {
    kek: 'lol-123',
    params,
    login,
    sessionByToken,
    sessions,
  };
}
