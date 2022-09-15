import { Type, TSchema } from '@sinclair/typebox';
import TPCore from '~/2p-core';

export enum CrudMethod {
  CREATE = 'create',
  UPDATE = 'update',
  REMOVE = 'remove',
  FIND_ONE = 'findOne',
  FIND_ALL = 'findAll',
}

export const Method = <REQ extends TSchema, RES extends TSchema>(request: REQ, response: RES) => Type.Function(
  [
    request,
  ],
  Type.Promise(response),
);

export const FindAll = <OF extends TSchema, F extends TSchema, L extends TSchema>(of: OF, f: F, l: L) => Type.Function(
  [
    Type.Object({
      query: Type.Object({
        limit: Type.Optional(Type.Integer()),
        offset: Type.Optional(Type.Integer()),
        order: Type.Optional(Type.Object({
          field: of,
          direction: Type.Union([
            Type.Literal('asc'),
            Type.Literal('desc'),
          ]),
        })),
        filter: Type.Optional(f),
      }),
    })
  ],
  Type.Promise(Type.Object({
    list: Type.Array(l),
    total: Type.Integer(),
  })),
);

export const FindOne = <KEY extends TSchema, E extends TSchema>(key: KEY, e: E) => Type.Function(
  [
    Type.Object({
      params: key,
    }),
  ],
  Type.Promise(e),
);

export type CrudProps<E, C_E, U_E, L_E, K, OF, F> = {
  entity: E;
  createEntity: C_E;
  updateEntity: U_E;
  listedEntity: L_E;
  entityKey: K;
  entityOrderField: OF;
  entityFilter: F;
};

export const Crud = <
  E extends TSchema,
  C_E extends TSchema,
  U_E extends TSchema,
  L_E extends TSchema,
  K extends TSchema,
  OF extends TSchema,
  F extends TSchema,
  >(props: CrudProps<E, C_E, U_E, L_E, K, OF, F>) => {
  return Type.Object({
    [CrudMethod.CREATE]: Method(
      Type.Object({
        data: props.createEntity,
      }),
      props.entity,
    ),
    [CrudMethod.UPDATE]: Method(
      Type.Object({
        params: props.entityKey,
        data: props.updateEntity,
      }),
      props.entity,
    ),
    [CrudMethod.REMOVE]: Method(
      Type.Object({
        params: props.entityKey,
      }),
      Type.Void(),
    ),
    [CrudMethod.FIND_ONE]: FindOne(props.entityKey, props.entity),
    [CrudMethod.FIND_ALL]: FindAll(props.entityOrderField, props.entityFilter, props.listedEntity),
  });
};

export const requestConfig: Record<CrudMethod, TPCore.api.RequestConfig> = {
  [CrudMethod.CREATE]: {
    method: 'POST',
    url: '',
  },
  [CrudMethod.UPDATE]: {
    method: 'PUT',
    url: '/:id',
  },
  [CrudMethod.REMOVE]: {
    method: 'DELETE',
    url: '/:id',
  },
  [CrudMethod.FIND_ONE]: {
    method: 'GET',
    url: '/:id',
  },
  [CrudMethod.FIND_ALL]: {
    method: 'GET',
    url: '',
  },
};
