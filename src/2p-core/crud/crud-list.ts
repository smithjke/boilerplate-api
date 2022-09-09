export type CrudListQuery<ORDER_FIELD = string, FILTER = object> = {
  limit?: number;
  offset?: number;
  order?: {
    field: ORDER_FIELD;
    direction: 'asc' | 'desc';
  };
  filter?: FILTER;
};

export function makeCrudListQuerySchema(orderFieldSchema: object, filterSchema: object): object {
  return {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
      },
      offset: {
        type: 'number',
      },
      order: {
        type: 'object',
        required: ['field', 'direction'],
        properties: {
          field: orderFieldSchema,
          direction: {
            type: 'string',
            enum: ['asc', 'desc'],
          },
        },
      },
      filter: filterSchema,
    },
  };
}

export type CrudListResult<T> = {
  list: Array<T>;
  total: number;
};

export function makeCrudListResultSchema(itemSchema: object): object {
  return {
    type: 'object',
    properties: {
      list: {
        type: 'array',
        items: itemSchema,
      },
      total: {
        type: 'number',
      },
    },
  };
}
