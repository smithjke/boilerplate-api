import { FastifyInstance } from 'fastify';
import TPServer from '~/2p-server';
import { HelloWorld } from '~/api';
import { useHelloWorldService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useHelloWorldService();

  TPServer.api.registerCrudRoutes({
    fastifyInstance,
    crudService,
    entityCrudFindAllQueryOrderFieldSchema: HelloWorld.EntityCrudFindAllQueryOrderFieldSchema,
    entityCrudFindAllQueryFilterSchema: HelloWorld.EntityCrudFindAllQueryFilterSchema,
    entityIdSchema: HelloWorld.EntitySchema.properties.id,
    entitySchema: HelloWorld.EntitySchema,
    listedEntitySchema: HelloWorld.ListedEntitySchema,
    createEntitySchema: HelloWorld.CreateEntitySchema,
    updateEntitySchema: HelloWorld.UpdateEntitySchema,
  });

  done();
}
