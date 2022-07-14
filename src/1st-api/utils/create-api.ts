import { BaseClient } from '../common';

export type Api = {
  setTokenGetter: (tokenGetter: () => string) => void;
};

export function createApi<T extends Record<string, BaseClient>>(clients: T): T & Api {
  const methods: any = {
    tokenGetter: null,
  };

  const proxyClients: Record<string, BaseClient> & Api = {
    setTokenGetter: (tokenGetter: () => string) => {
      methods.tokenGetter = tokenGetter;
    },
  };

  Object.keys(clients).forEach((clientKey) => {
    proxyClients[clientKey] = new Proxy(clients[clientKey], {
      get(target: Record<string, (...args: any) => any>, p: string) {
        if (typeof target[p] === 'function') {
          return (...props: Array<any>) => {
            if (methods.tokenGetter && (props[0].query || props[0].data)) {
              // eslint-disable-next-line no-param-reassign
              props[0].token = methods.tokenGetter();
            }
            return target[p](...props);
          };
        }
        return target[p];
      },
    });
  });

  return proxyClients as T & Api;
}
