import { FastifyInstance } from 'fastify';
import { Page } from '@smithjke/boilerplate-schema';
import { usePageService } from './di';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = usePageService();

  registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema: Page.entityCrudSchema,
  });

  done();
}
