import { FastifyInstance, FastifyRequest } from 'fastify';
import * as Auth from '~/auth';
import * as Page from '~/page';
import * as Session from '~/session';
import * as User from '~/user';

export async function privateApiPlugin(fastifyInstance: FastifyInstance) {
  fastifyInstance.addHook('preHandler', async (request: FastifyRequest) => {
    // const authService = Auth.useAuthService();
    console.log('bearer >>>', request.bearerToken);
    console.log('currentSession >>>', request.currentSession);
  });

  fastifyInstance.register(Session.plugin, { prefix: '/session' });
  fastifyInstance.register(User.plugin, { prefix: '/user' });
}

export async function apiPlugin(fastifyInstance: FastifyInstance) {
  fastifyInstance.register(privateApiPlugin);
  fastifyInstance.register(Auth.plugin, { prefix: '/auth' });
  fastifyInstance.register(Page.plugin, { prefix: '/page' });
}
