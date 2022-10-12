import { FastifyInstance } from 'fastify';
import * as Auth from '~/auth';
import * as Page from '~/page';
import * as Session from '~/session';
import * as User from '~/user';

export async function privateApiPlugin(fastifyInstance: FastifyInstance) {
  const authService = Auth.useAuthService();

  fastifyInstance.addHook('preHandler', async (request, reply) => {
    console.log('HEADERS >>>', request.headers);
    const token = (request.headers['authorization'] || '').replace('Bearer ', '') || null;
    console.log('token >>>', token);
  });

  fastifyInstance.register(Session.plugin, { prefix: '/session' });
  fastifyInstance.register(User.plugin, { prefix: '/user' });
}

export async function apiPlugin(fastifyInstance: FastifyInstance) {
  fastifyInstance.register(privateApiPlugin);
  fastifyInstance.register(Auth.plugin, { prefix: '/auth' });
  fastifyInstance.register(Page.plugin, { prefix: '/page' });
}
