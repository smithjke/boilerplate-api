import { ApiListResult } from '../schema';

export function createMapApiListResult<NORMAL, RAW>(
  mapper?: (data: NORMAL) => RAW,
): (apiParams: ApiListResult<NORMAL>) => ApiListResult<RAW> {
  return (apiListResult: ApiListResult<NORMAL>) => ({
    ...apiListResult,
    list: (Array.isArray(apiListResult.list) && mapper) ? apiListResult.list.map(mapper) : [],
  });
}
