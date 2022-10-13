import { FastifyInstance } from 'fastify';
import { registerCrudRoutes } from '@smithjke/2p-server/crud';
import { User } from '@smithjke/boilerplate-schema';
import { useUserService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  registerCrudRoutes({
    fastifyInstance,
    crudSchema: User.entityCrudSchema,
    useCrudFastifyService: useUserService,
  });
}
