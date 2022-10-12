import { FastifyInstance } from 'fastify';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';
import { User } from '@smithjke/boilerplate-schema';
import { useUserService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useUserService();

  registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema: User.entityCrudSchema,
  });

  done();
}
