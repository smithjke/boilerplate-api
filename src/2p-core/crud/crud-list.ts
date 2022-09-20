import { TSchema, Type } from '@sinclair/typebox';

export type CrudListQuery<ORDER_FIELD = string, FILTER = object> = {
  limit?: number;
  offset?: number;
  order?: {
    field: ORDER_FIELD;
    direction: 'asc' | 'desc';
  };
  filter?: FILTER;
};

export function makeCrudListQuerySchema<OF extends TSchema, F extends TSchema>(field: OF, filter: F) {
  return Type.Partial(
    Type.Object({
      limit: Type.Number({ minimum: 0 }),
      offset: Type.Number({ minimum: 0 }),
      order: Type.Object({
        field,
        direction: Type.Union([
          Type.Literal('asc'),
          Type.Literal('desc'),
        ])
      }),
      filter,
    }),
  );
}

export type CrudListResult<T> = {
  list: Array<T>;
  total: number;
};

export function makeCrudListResultSchema<I extends TSchema>(item: I) {
  return Type.Object({
    list: Type.Array(item),
    total: Type.Number({ minimum: 0 }),
  });
}
