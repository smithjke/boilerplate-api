import { BaseClient } from '~/1st-api';

export function createApi<T extends Record<string, BaseClient>>(clients: T): T {
  const proxyClients: any = {};

  Object.keys(clients).forEach((clientKey) => {
    proxyClients[clientKey] = new Proxy(clients[clientKey], {});
  });

  return proxyClients as T;
}
