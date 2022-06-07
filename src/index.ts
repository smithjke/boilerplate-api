import dotenv from 'dotenv';
import express from 'express';
import { registerDependency } from '~/1st-di';
import { jsonRpcMiddleware, restMiddleware, UserService } from '~/app';
import { MongoService, useMongoService } from '~/1st-mongo';

dotenv.config();

registerDependency('MONGO_SERVICE', () => new MongoService());
registerDependency('USER_SERVICE', () => new UserService());

const { PORT } = process.env;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use('/json-rpc', jsonRpcMiddleware);
app.use('/api', restMiddleware);
app.get('/', (req, res) => {
  res.send('Hello!');
});

const mongoService = useMongoService();

mongoService.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Mongo connect error >>>', error);
  });
