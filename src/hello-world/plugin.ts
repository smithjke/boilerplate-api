import { FastifyInstance } from 'fastify';
import TPServer from '~/2p-server';
import { HelloWorld } from '~/api';
import { useHelloWorldService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useHelloWorldService();

  TPServer.api.registerCrudRoutes({
    fastifyInstance,
    crudService,
    entityCrudFindAllQuerySchema: HelloWorld.EntityCrudFindAllQuerySchema,
    entityCrudFindAllResultSchema: HelloWorld.EntityCrudFindAllResultSchema,
    entityCrudFindOneParamsSchema: HelloWorld.EntityCrudFindOneParamsSchema,
    entitySchema: HelloWorld.EntitySchema,
    createEntitySchema: HelloWorld.CreateEntitySchema,
    updateEntitySchema: HelloWorld.UpdateEntitySchema,
  });

  done();
}
