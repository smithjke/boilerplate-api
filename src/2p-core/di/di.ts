const dependencyCreators = {};

const dependencies = {};

export function registerDependency(key: string, creator: () => object): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dependencyCreators[key] = creator;
}

export function getDependency<T>(key: string): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const creator = dependencyCreators[key];

  if (!creator) {
    throw new Error(`${key}: No dependency registered`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!dependencies[key]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dependencies[key] = creator();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return dependencies[key];
}
