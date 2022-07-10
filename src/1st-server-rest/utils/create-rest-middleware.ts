import express, { Request, Response } from 'express';
import { ApiParams } from '~/1st-api';
import { HttpMethod } from '~/1st-rest';

export type RestMethod = (params: ApiParams<any, any>) => Promise<any>;
export type RestRoute = [HttpMethod, string, RestMethod];

export function createRestMiddleware(routes: Array<RestRoute>) {
  const router = express.Router();

  routes.forEach((route) => {
    const [httpMethod, endpoint, restMethod] = route;
    router[httpMethod](endpoint, (req: express.Request, res: express.Response) => {
      // @todo logs
      // console.log('request headers >>>', req.headers);
      console.log('=====================================');
      console.log('request url >>>', req.url);
      console.log('request query >>>', req.query);
      console.log('request params >>>', req.params);
      console.log('request body >>>', req.body);
      restMethod({
        query: { ...req.params, ...req.query },
        token: String(req.headers['session-token']),
        data: req.body,
      })
        .then((result) => {
          // console.log('result', result);
          res.send(result);
        })
        .catch((error) => {
          console.error('error', error);
          res.status(500).send(error.message);
        });
    });
  });

  const errorHandler = async (error: any, req: Request, res: Response, _) => {
    res.send(500);

    console.error('REST ERROR', error);
  };

  return [router, errorHandler];
}
