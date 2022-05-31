import express, { Request, Response } from 'express';
import { JsonRpcResponse, makeErrorJsonRpcResponse, makeResultJsonRpcResponse } from '~/1st-json-rpc';

export type JsonRpcMethod = (params: any) => Promise<any>;

async function callMethod(methods: Record<string, JsonRpcMethod>, jsonRpcRequest: any): Promise<JsonRpcResponse> {
  const id = jsonRpcRequest['id'] || null;

  try {
    if (jsonRpcRequest['jsonrpc'] !== '2.0') {
      return makeErrorJsonRpcResponse(id, {
        code: -32600,
        message: 'Invalid Request',
      });
    }

    if (typeof jsonRpcRequest['method'] !== 'string') {
      return makeErrorJsonRpcResponse(id, {
        code: -32600,
        message: 'Invalid Request',
      });
    }

    const method = methods[jsonRpcRequest['method']];

    if (!method) {
      return makeErrorJsonRpcResponse(id, {
        code: -32601,
        message: 'Method not found',
      });
    }

    const result = await method(jsonRpcRequest['params']);

    return id ? makeResultJsonRpcResponse(id, result) : null;
  } catch (e) {
    if (e.code && e.message) {
      return makeErrorJsonRpcResponse(id, {
        code: e.code,
        message: e.message,
      });
    }

    return makeErrorJsonRpcResponse(id, {
      code: -32603,
      message: 'Internal error',
    });
  }
}

export function createJsonRpcMiddleware(methods: Record<string, JsonRpcMethod>) {
  const router = express.Router();

  router.post('*', (req: express.Request, res: express.Response) => {
    if (Array.isArray(req.body)) {
      if (req.body.length) {
        Promise.all(req.body.map((body) => callMethod(methods, body)))
          .then((responses) => res.json(responses.filter(Boolean)))
          .catch((error) => res.json(makeErrorJsonRpcResponse(null, {
            code: 1488,
            message: error.message,
          })));
      } else {
        res.json(makeErrorJsonRpcResponse(null, {
          code: -32600,
          message: 'Invalid Request',
        }));
      }
    } else {
      callMethod(methods, req.body)
        .then((response) => res.json(response || void 0))
        .catch((error) => res.json(makeErrorJsonRpcResponse(null, {
          code: 4242,
          message: error.message,
        })));
    }
  });

  const errorHandler = async (error: any, req: Request, res: Response, _) => {
    res.json(makeErrorJsonRpcResponse(null, {
      code: -32700,
      message: 'Parse error',
    }));

    console.error('JSON-RPC ERROR', error);
  };

  return [router, errorHandler];
}
