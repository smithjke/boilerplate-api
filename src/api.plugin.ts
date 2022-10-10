import { FastifyInstance } from 'fastify';
import * as Auth from '~/auth';
import * as Page from '~/page';
import * as Session from '~/session';
import * as User from '~/user';

export function privateApiPlugin(fastifyInstance: FastifyInstance, options: object, done: () => void) {
  fastifyInstance.addHook('preHandler', (request, reply, done) => {
    console.log('HEADERS >>>', request.headers);
    const token = (request.headers['authorization'] || '').replace('Bearer ', '') || null;
    console.log('token >>>', token);
    done();
  });
  fastifyInstance.register(Session.plugin, { prefix: '/session' });
  fastifyInstance.register(User.plugin, { prefix: '/user' });
  done();
}

export function apiPlugin(fastifyInstance: FastifyInstance, options: object, done: () => void) {
  fastifyInstance.register(privateApiPlugin);
  fastifyInstance.register(Auth.plugin, { prefix: '/auth' });
  fastifyInstance.register(Page.plugin, { prefix: '/page' });
  done();
}
