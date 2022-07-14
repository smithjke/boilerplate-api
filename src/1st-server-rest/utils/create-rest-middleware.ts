import express, { Request, Response } from 'express';
import { ApiError, ApiErrorCode, ApiParams } from '~/1st-api';
import { apiErrorCode2HttpCode, HttpMethod } from '~/1st-rest';

export type RestMethod = (params: ApiParams) => Promise<any>;
export type RestRoute = [HttpMethod, string, RestMethod];

const SOMETHING_WRONG = 'Something wrong';

export function createRestMiddleware(routes: Array<RestRoute>) {
  const router = express.Router();

  routes.forEach((route) => {
    const [httpMethod, endpoint, restMethod] = route;
    router[httpMethod](endpoint, (req: express.Request, res: express.Response) => {
      // @todo logs
      console.log('=====================================');
      console.log('request url >>>', req.url);
      console.log('request query >>>', req.query);
      console.log('request params >>>', req.params);
      restMethod({
        query: { ...req.params, ...req.query },
        token: String(req.headers['session-token']),
        data: req.body,
      })
        .then((result) => {
          res.send(result);
        })
        .catch((error: ApiError) => {
          console.error('error >>>', error);
          res
            .status(apiErrorCode2HttpCode[error.code || ApiErrorCode.INTERNAL_SERVER_ERROR])
            .send(error.code ? error.message : SOMETHING_WRONG);
        });
    });
  });

  const errorHandler = async (error: Error, req: Request, res: Response, _) => {
    console.error('handled error >>>', error);
    res
      .status(apiErrorCode2HttpCode[ApiErrorCode.INTERNAL_SERVER_ERROR])
      .send(SOMETHING_WRONG);
  };

  return [router, errorHandler];
}
