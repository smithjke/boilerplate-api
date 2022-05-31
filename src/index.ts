import dotenv from 'dotenv';
import express from 'express';
import { registerDependency } from '~/1st-di';
import { jsonRpcMiddleware } from '~/app';

registerDependency('TEST', () => null);

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use('/json-rpc', jsonRpcMiddleware);
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
