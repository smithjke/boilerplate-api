import { FastifyInstance } from 'fastify';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';
import { Page } from '@smithjke/boilerplate-schema';
import { usePageService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  registerCrudRoutes({
    fastifyInstance,
    crudSchema: Page.entityCrudSchema,
    useCrudFastifyService: usePageService,
  });
}
