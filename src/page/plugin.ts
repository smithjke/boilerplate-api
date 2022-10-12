import { FastifyInstance } from 'fastify';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';
import { Page } from '@smithjke/boilerplate-schema';
import { usePageService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = usePageService();

  registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema: Page.entityCrudSchema,
  });

  done();
}
