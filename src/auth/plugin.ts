import { FastifyInstance } from 'fastify';
import { Auth } from '@smithjke/boilerplate-schema';
import { useAuthService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const service = useAuthService();

  fastifyInstance.route({
    method: Auth.apiConfig.login.method as any,
    url: Auth.apiConfig.login.url,
    schema: {
      body: Auth.login,
      response: {
        200: Auth.result,
      },
    },
    handler: (request) => service.login(
      request.body as Auth.Login,
    ),
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
    handler: (request) => service.refresh(
      request.body as Auth.Refresh,
    ),
  });

  done();
}
