import { ApiParams } from '../schema';

export function createMapApiParams<NORMAL, RAW>(
  mapper?: (data: NORMAL) => RAW,
): (apiParams: ApiParams<NORMAL>) => ApiParams<RAW> {
  return (apiParams: ApiParams<NORMAL>) => ({
    ...apiParams,
    data: mapper ? mapper(apiParams.data) : void 0,
  });
}
