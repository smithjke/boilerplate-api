import dotenv from 'dotenv';
import express from 'express';
import { registerDependency } from '~/1st-di';
import { MongoService, useMongoService } from '~/1st-server-mongo';
import {
  AuthService,
  GuardService,
  jsonRpcMiddleware,
  PermissionService,
  restMiddleware,
  RoleService,
  SessionService,
  UserService,
  useUserService,
} from '~/app';

dotenv.config();

registerDependency('MONGO_SERVICE', () => new MongoService());
registerDependency('GUARD_SERVICE', () => new GuardService());
registerDependency('AUTH_SERVICE', () => new AuthService());
registerDependency('PERMISSION_SERVICE', () => new PermissionService());
registerDependency('ROLE_SERVICE', () => new RoleService());
registerDependency('SESSION_SERVICE', () => new SessionService());
registerDependency('USER_SERVICE', () => new UserService());

const { PORT } = process.env;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use('/json-rpc', jsonRpcMiddleware());
app.use('/api', restMiddleware());
app.get('/', (req, res) => {
  res.send('Hello!');
});

const mongoService = useMongoService();
const userService = useUserService();

mongoService.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
    userService.init()
      .then(() => console.log('User service init success'))
      .catch((err) => console.log('User service init error >>>', err));
  })
  .catch((error) => {
    console.error('Mongo connect error >>>', error);
  });
