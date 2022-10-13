import { FastifyInstance } from 'fastify';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';
import { Session } from '@smithjke/boilerplate-schema';
import { useSessionService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  registerCrudRoutes({
    fastifyInstance,
    crudSchema: Session.entityCrudSchema,
    useCrudFastifyService: useSessionService,
  });
}
