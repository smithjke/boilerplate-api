import express from 'express';
import qs from 'qs';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { useMongoService } from '~/1st-server-mongo';
import { config } from '~/config';
import { registerDependencies } from '~/dependencies';
import { jsonRpcMiddleware, restMiddleware, useUserService } from '~/app';
import { apiPlugin } from '~/api.plugin';

registerDependencies();

const fastify: FastifyInstance = Fastify({
  querystringParser: (str) => qs.parse(str),
});

fastify.register(apiPlugin, { prefix: '/api' });

const app = express();

app.use(express.json({ type: '*/*' }));
app.use('/json-rpc', jsonRpcMiddleware());
app.use('/api', restMiddleware());

const mongoService = useMongoService();
const userService = useUserService();

async function start(): Promise<void> {
  // await mongoService.connect();
  // await userService.init();
  // app.listen(config.PORT, () => console.log(`Listen on port ${config.PORT}`));

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
