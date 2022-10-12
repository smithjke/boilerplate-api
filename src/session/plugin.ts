import { FastifyInstance } from 'fastify';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';
import { Session } from '@smithjke/boilerplate-schema';
import { useSessionService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useSessionService();

  registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema: Session.entityCrudSchema,
  });

  done();
}
