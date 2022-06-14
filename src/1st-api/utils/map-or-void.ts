export function mapOrVoid<FROM, TO>(data: FROM, mapFn: (from: FROM) => TO): TO {
  return typeof data === 'undefined' ? void 0 : mapFn(data);
}
