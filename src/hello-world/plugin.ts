import { FastifyInstance } from 'fastify';
import TPCore from '~/2p-core';
import TPServer from '~/2p-server';
import { HelloWorld } from '~/api';
import { useHelloWorldService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useHelloWorldService();

  TPServer.api.registerCrudRoutes({
    fastifyInstance,
    crudService,
    entitySchema: HelloWorld.entity,
    createEntitySchema: HelloWorld.createEntity,
    updateEntitySchema: HelloWorld.updateEntity,
    entityCrudFindAllQuerySchema: TPCore.crud.makeCrudListQuerySchema(HelloWorld.entityOrderField, HelloWorld.entityFilter),
    entityCrudFindAllResultSchema: TPCore.crud.makeCrudListResultSchema(HelloWorld.listedEntity),
    entityCrudFindOneParamsSchema: HelloWorld.entityKey,
  });

  fastifyInstance.route({
    method: HelloWorld.entityApiConfig.doBarrelRoll.method as any,
    url: HelloWorld.entityApiConfig.doBarrelRoll.url,
    schema: {
      params: HelloWorld.entityKey,
      body: HelloWorld.updateEntity,
      response: {
        200: HelloWorld.entity,
      },
    },
    handler: async (request, reply) => {
      return crudService.doBarrelRoll(
        request.body as HelloWorld.UpdateEntity,
        request.params as HelloWorld.EntityKey,
      );
    },
  });

  done();
}
