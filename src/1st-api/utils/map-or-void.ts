export function mapOrVoid<FROM, TO>(data: FROM, mapFn: (from: FROM) => TO): TO {
  return (typeof data === 'undefined' || data === null) ? void 0 : mapFn(data);
}
