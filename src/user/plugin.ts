import { FastifyInstance } from 'fastify';
import { User } from '@smithjke/boilerplate-schema';
import { useUserService } from './di';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useUserService();

  registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema: User.entityCrudSchema,
  });

  done();
}
