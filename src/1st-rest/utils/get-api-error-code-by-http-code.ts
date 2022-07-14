import { ApiErrorCode } from '~/1st-api';

export function getApiErrorCodeByHttpCode(httpCode: number): ApiErrorCode {
  switch (httpCode) {
    case 400: return ApiErrorCode.BAD_REQUEST;
    case 401: return ApiErrorCode.UNAUTHORIZED;
    case 403: return ApiErrorCode.FORBIDDEN;
    case 404: return ApiErrorCode.NOT_FOUND;
  }

  return ApiErrorCode.INTERNAL_SERVER_ERROR;
}
