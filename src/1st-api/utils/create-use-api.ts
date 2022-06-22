import { BaseClient } from '../common';

let initClients: any;

export function createUseApi<T extends Record<string, BaseClient>>(clients: () => T): () => T {
  return () => {
    if (!initClients) {
      initClients = clients();
    }
    return initClients;
  };
}
