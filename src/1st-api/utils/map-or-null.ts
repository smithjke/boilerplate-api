export function mapOrNull<FROM, TO>(data: FROM, mapFn: (from: FROM) => TO): TO {
  return (typeof data === 'undefined' || data === null) ? null : mapFn(data);
}
