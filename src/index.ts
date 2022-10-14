import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import qs from 'qs';
import { getRequestBearer } from '@smithjke/2p-server/api';
import { Session } from '@smithjke/boilerplate-schema';
import { apiPlugin } from '~/api.plugin';
import { config } from '~/config';
import { registerDependencies } from '~/dependencies';
import { useSessionService } from '~/session';

declare module 'fastify' {
  export interface FastifyRequest {
    bearerToken?: string;
    currentSession?: Session.ListedEntity;
  }
}

registerDependencies();

const fastify: FastifyInstance = Fastify({
  querystringParser: (str) => qs.parse(str),
});

async function start(): Promise<void> {
  const sessionService = useSessionService();

  fastify.addHook('preParsing', async (request: FastifyRequest) => {
    request.bearerToken = getRequestBearer(request);
    if (request.bearerToken) {
      request.currentSession = await sessionService.findActiveSession(request.bearerToken);
    }
  });

  fastify.register(apiPlugin, { prefix: '/api' });

  await fastify.listen({ port: Number(config.PORT) });

  const address = fastify.server.address();
  const port = typeof address === 'string' ? address : address?.port;

  console.log('address >>>', address);
  console.log('port >>>', port);
}

start()
  .then(() => console.log('Server started successfully'))
  .catch((error) => {
    console.log('Server start failed', error);
    fastify.log.error(error);
    process.exit(1);
  });
