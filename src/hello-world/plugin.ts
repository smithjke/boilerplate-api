import { FastifyInstance } from 'fastify';
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
    entityCrudFindAllQuerySchema: HelloWorld.crud.properties.findAll.parameters[0].properties.query,
    entityCrudFindAllResultSchema: HelloWorld.crud.properties.findAll.returns.item,
    entityCrudFindOneParamsSchema: HelloWorld.crud.properties.findOne.parameters[0].properties.params,
  });

  fastifyInstance.route({
    method: 'PUT',
    url: '/:id/do-barrel-roll',
    schema: {
      params: HelloWorld.doBarrelRollRequest.properties.params,
      body: HelloWorld.doBarrelRollRequest.properties.data,
      response: {
        200: HelloWorld.doBarrelRollResponse,
      },
    },
    handler: async (request, reply) => {
      return crudService.doBarrelRoll({
        params: request.params as HelloWorld.DoBarrelRollRequest['params'],
        data: request.body as HelloWorld.DoBarrelRollRequest['data'],
      });
    },
  });

  done();
}
