export type SingleParams<T> = {
  id: T;
};

export function makeSingleParamsSchema(property: object): object {
  return {
    type: 'object',
    required: ['id'],
    properties: {
      id: property,
    },
  };
}
