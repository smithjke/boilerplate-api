import { FastifyInstance } from 'fastify';
import { Session } from '@smithjke/boilerplate-schema';
import { useSessionService } from './di';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useSessionService();

  registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema: Session.entityCrudSchema,
  });

  done();
}
