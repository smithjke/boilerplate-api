import { FastifyInstance } from 'fastify';
import TPServer from '~/2p-server';
import { HelloWorld } from '~/api';
import { useHelloWorldService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useHelloWorldService();
  const { crudSchema } = HelloWorld;

  TPServer.api.registerCrudRoutes({
    fastifyInstance,
    crudService,
    crudSchema,
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
