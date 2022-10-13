import { FastifyInstance, FastifyRequest } from 'fastify';
import { Auth } from '@smithjke/boilerplate-schema';
import { useAuthService } from './di';

export async function plugin(fastifyInstance: FastifyInstance) {
  fastifyInstance.route({
    method: Auth.apiConfig.login.method as any,
    url: Auth.apiConfig.login.url,
    schema: {
      body: Auth.login,
      response: {
        200: Auth.result,
      },
    },
    handler: (request: FastifyRequest) => {
      const service = useAuthService();
      service.setRequest(request);
      return service.login(
        request.body as Auth.Login,
      );
    },
  });

  fastifyInstance.route({
    method: Auth.apiConfig.refresh.method as any,
    url: Auth.apiConfig.refresh.url,
    schema: {
      body: Auth.refresh,
      response: {
        200: Auth.result,
      },
    },
    handler: (request: FastifyRequest) => {
      const service = useAuthService();
      service.setRequest(request);
      return service.refresh(
        request.body as Auth.Refresh,
      );
    },
  });
}
