import { FastifyInstance } from 'fastify';
import TPServer from '~/2p-server';
import { HelloWorld } from '~/api';
import { useHelloWorldService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useHelloWorldService();

  TPServer.api.registerCrudRoutes({
    fastifyInstance,
    crudService,
    entitySchema: HelloWorld.EntitySchema,
    createEntitySchema: HelloWorld.CreateEntitySchema,
    updateEntitySchema: HelloWorld.UpdateEntitySchema,
    entityCrudFindAllQuerySchema: HelloWorld.EntityFindAllSchema.request.query,
    entityCrudFindAllResultSchema: HelloWorld.EntityFindAllSchema.response,
    entityCrudFindOneParamsSchema: HelloWorld.EntityFindOneSchema.request.params,
  });

  fastifyInstance.route({
    method: 'PUT',
    url: '/:id/do-barrel-roll',
    schema: {
      params: HelloWorld.EntityDoBarrelRollSchema.request.params,
      body: HelloWorld.EntityDoBarrelRollSchema.request.data,
      response: {
        200: HelloWorld.EntityDoBarrelRollSchema.response,
      },
    },
    handler: async (request, reply) => {
      return crudService.doBarrelRoll({
        params: request.params as HelloWorld.EntityDoBarrelRoll['request']['params'],
        data: request.body as HelloWorld.EntityDoBarrelRoll['request']['data'],
      });
    },
  });

  done();
}
