import { ApiError, BaseClient } from '../common';

export type Api = {
  setTokenGetter: (tokenGetter: () => string) => void;
  setErrorHandler: (errorHandler: (error: ApiError) => void) => void;
};

export function createApi<T extends Record<string, BaseClient>>(clients: T): T & Api {
  const methods: any = {
    tokenGetter: null,
    errorHandler: null,
  };

  const proxyClients: Record<string, BaseClient> & Api = {
    setTokenGetter: (tokenGetter: () => string) => {
      methods.tokenGetter = tokenGetter;
    },
    setErrorHandler: (errorHandler: (error: ApiError) => void) => {
      methods.errorHandler = errorHandler;
    },
  };

  Object.keys(clients).forEach((clientKey) => {
    proxyClients[clientKey] = new Proxy(clients[clientKey], {
      get(target: Record<string, (...args: any) => any>, p: string) {
        if (typeof target[p] === 'function') {
          return (...props: Array<any>) => {
            if (props[0].query || props[0].data) {
              if (methods.tokenGetter) {
                // eslint-disable-next-line no-param-reassign
                props[0].token = methods.tokenGetter();
              }
              return new Promise((resolve, reject) => {
                target[p](...props)
                  .then((result: any) => {
                    resolve(result);
                  })
                  .catch((error: ApiError) => {
                    methods.errorHandler(error);
                    reject(error);
                  });
              });
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
