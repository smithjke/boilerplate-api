import express, { Request, Response } from 'express';
import { HttpMethod } from '~/1st-api';

// export type HttpMethod = 'get' | 'post' | 'put' | 'update' | 'delete';
export type RestMethod = (params: any) => Promise<any>;
export type RestRoute = [HttpMethod, string, RestMethod];

export function createRestMiddleware(routes: Array<RestRoute>) {
  const router = express.Router();

  routes.forEach((route) => {
    router[route[0]](route[1], (req: express.Request, res: express.Response) => {
      console.log('request headers >>>', req.headers);
      console.log('request query >>>', req.query);
      console.log('request params >>>', req.params);
      console.log('request body >>>', req.body);
      route[2]({
        query: { ...req.params, ...req.query },
        token: req.headers['session-token'],
        data: req.body,
      })
        .then((result) => {
          console.log('result', result);
          res.send(result);
        })
        .catch((error) => {
          console.error('error', error);
          res.sendStatus(500);
        });
    });
  });

  const errorHandler = async (error: any, req: Request, res: Response, _) => {
    res.send(500);

    console.error('REST ERROR', error);
  };

  return [router, errorHandler];
}
