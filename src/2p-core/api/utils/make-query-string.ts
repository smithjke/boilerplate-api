function addPrefix(value: string, prefix?: string): string {
  return prefix ? `${prefix}[${value.split(']').join('').split('[').join('][')}]` : value;
}

export function makeQueryString(query: Record<string, any>, prefix?: string): string {
  return Object.keys(query).map((key) => {
    if (Array.isArray(query[key])) {
      return query[key].map(
        (row: string | number | boolean) => [`${addPrefix(key, prefix)}`, encodeURIComponent(String(row))].join('='),
      ).join('&');
    }

    if (typeof query[key] === 'object') {
      return makeQueryString(query[key], addPrefix(key, prefix));
    }

    return [addPrefix(key, prefix), encodeURIComponent(String(query[key]))].join('=');
  }).join('&');
}
