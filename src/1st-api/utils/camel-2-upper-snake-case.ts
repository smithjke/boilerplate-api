export function camel2UpperSnakeCase(camel: string): string {
  return camel
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map((part) => part.toUpperCase())
    .join('_');
}
