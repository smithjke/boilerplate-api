import { BaseClient } from '../common';

export function createApi<T extends Record<string, BaseClient>>(clients: T): T {
  const proxyClients: any = {};

  Object.keys(clients).forEach((clientKey) => {
    proxyClients[clientKey] = new Proxy(clients[clientKey], {});
  });

  return proxyClients as T;
}
