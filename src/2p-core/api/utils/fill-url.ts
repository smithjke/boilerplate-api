export const fillUrl = (url: string, params: any): string =>
  Object
    .keys(params)
    .reduce((str, key) => str.split(`:${key}`).join(params[key]), url);
