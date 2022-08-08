import express from 'express';
import { useMongoService } from '~/1st-server-mongo';
import { config } from '~/config';
import { registerDependencies } from '~/dependencies';
import { jsonRpcMiddleware, restMiddleware, useUserService } from '~/app';

registerDependencies();

const app = express();

app.use(express.json({ type: '*/*' }));
app.use('/json-rpc', jsonRpcMiddleware());
app.use('/api', restMiddleware());

const mongoService = useMongoService();
const userService = useUserService();

async function start(): Promise<void> {
  await mongoService.connect();
  await userService.init();
  app.listen(config.PORT, () => console.log(`Listen on port ${config.PORT}`));
}

start()
  .then(() => console.log('Server started successfully'))
  .catch((error) => console.log('Server start failed', error));
