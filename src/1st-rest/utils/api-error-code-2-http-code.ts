import { ApiErrorCode } from '~/1st-api';

export const apiErrorCode2HttpCode: Record<ApiErrorCode, number> = {
  [ApiErrorCode.BAD_REQUEST]: 400,
  [ApiErrorCode.UNAUTHORIZED]: 401,
  [ApiErrorCode.FORBIDDEN]: 403,
  [ApiErrorCode.NOT_FOUND]: 404,
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: 500,
};
