import Fastify, { FastifyInstance } from 'fastify';
import qs from 'qs';
import { config } from '~/config';
import { registerDependencies } from '~/dependencies';
import { apiPlugin } from '~/api.plugin';

registerDependencies();

const fastify: FastifyInstance = Fastify({
  querystringParser: (str) => qs.parse(str),
});

fastify.register(apiPlugin, { prefix: '/api' });

// const mongoService = useMongoService();
// const userService = useUserService();

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
