import { Type, TSchema } from '@sinclair/typebox';

export interface CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESPONSE> {
  create(request: { data: CREATE_ENTITY }): Promise<ENTITY>;

  update(request: { params: ONE_PARAMS, data: UPDATE_ENTITY }): Promise<ENTITY>;

  remove(request: { params: ONE_PARAMS }): Promise<void>;

  findOne(request: { params: ONE_PARAMS }): Promise<ENTITY>;

  findAll(request: { query: ALL_QUERY }): Promise<ALL_RESPONSE>;
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
    create: Type.Function([
      Type.Object({
        data: props.createEntity,
      }),
    ], Type.Promise(props.entity)),
    update: Type.Function([
      Type.Object({
        params: props.entityKey,
        data: props.updateEntity,
      }),
    ], Type.Promise(props.entity)),
    remove: Type.Function([
      Type.Object({
        params: props.entityKey,
      }),
    ], Type.Promise(Type.Void())),
    findOne: FindOne(props.entityKey, props.entity),
    findAll: FindAll(props.entityOrderField, props.entityFilter, props.listedEntity),
  });
};
