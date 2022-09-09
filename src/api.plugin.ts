import { FastifyInstance } from 'fastify';
import HelloWorld from '~/hello-world';

export function apiPlugin(fastifyInstance: FastifyInstance, options: object, done: () => void) {
  fastifyInstance.register(HelloWorld.plugin, { prefix: '/hello-world' });
  done();
}
