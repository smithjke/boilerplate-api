import express, { Request, Response } from 'express';
import { ApiError, ApiErrorCode, ApiParams } from '~/1st-api';
import { HttpMethod } from '~/1st-rest';

export type RestMethod = (params: ApiParams) => Promise<any>;
export type RestRoute = [HttpMethod, string, RestMethod];

const apiError2httpCode: Record<ApiErrorCode, number> = {
  [ApiErrorCode.BAD_REQUEST]: 400,
  [ApiErrorCode.UNAUTHORIZED]: 401,
  [ApiErrorCode.FORBIDDEN]: 403,
  [ApiErrorCode.NOT_FOUND]: 404,
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: 500,
};

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
            .status(apiError2httpCode[error.code || ApiErrorCode.INTERNAL_SERVER_ERROR])
            .send(error.code ? error.message : SOMETHING_WRONG);
        });
    });
  });

  const errorHandler = async (error: Error, req: Request, res: Response, _) => {
    console.error('handled error >>>', error);
    res
      .status(apiError2httpCode[ApiErrorCode.INTERNAL_SERVER_ERROR])
      .send(SOMETHING_WRONG);
  };

  return [router, errorHandler];
}
