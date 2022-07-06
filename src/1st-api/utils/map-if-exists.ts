export function mapIfExists<FROM, TO>(data: FROM, mapFn: (from: FROM) => TO): TO {
  if (typeof data === 'undefined') {
    return void 0;
  }

  if (data === null) {
    return null;
  }

  return mapFn(data);
}
