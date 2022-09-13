import { Static, Type } from '@sinclair/typebox';
import TPCore from '~/2p-core';

export const EntitySchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  amount: Type.Optional(Type.Number()),
  createdAt: Type.Integer(),
  updatedAt: Type.Integer(),
});

export type Entity = Static<typeof EntitySchema>;

export const CreateEntitySchema = Type.Omit(EntitySchema, [
  'id',
  'createdAt',
  'updatedAt',
]);

export type CreateEntity = Static<typeof CreateEntitySchema>;

export const UpdateEntitySchema = Type.Partial(CreateEntitySchema);

export type UpdateEntity = Static<typeof UpdateEntitySchema>;

export const ListedEntitySchema = Type.Omit(EntitySchema, [
  'createdAt',
  'updatedAt',
]);

export type ListedEntity = Static<typeof ListedEntitySchema>;

// FIND ALL

export enum EntityFindAllQueryOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export const EntityFindAllQueryOrderFieldSchema = Type.Enum(EntityFindAllQueryOrderField);

export const EntityFindAllQueryFilterSchema = Type.Partial(Type.Pick(EntitySchema, ['amount']));

export const EntityFindAllSchema = Type.Object({
  request: Type.Object({
    query: Type.Object({
      limit: Type.Optional(Type.Integer()),
      offset: Type.Optional(Type.Integer()),
      order: Type.Optional(Type.Object({
        field: EntityFindAllQueryOrderFieldSchema,
        direction: Type.Union([
          Type.Literal('asc'),
          Type.Literal('desc'),
        ]),
      })),
      filter: Type.Optional(EntityFindAllQueryFilterSchema),
    }),
  }),
  response: Type.Object({
    list: Type.Array(ListedEntitySchema),
    total: Type.Integer(),
  }),
});

export type EntityFindAll = Static<typeof EntityFindAllSchema>;

// FIND ONE

export const EntityFindOneSchema = Type.Object({
  request: Type.Object({
    params: Type.Object({
      id: EntitySchema.properties.id,
    }),
  }),
});

export type EntityFindOne = Static<typeof EntityFindOneSchema>;

// DO BARREL ROLL

export const EntityDoBarrelRollSchema = Type.Object({
  request: Type.Object({
    params: EntityFindOneSchema.properties.request.properties.params,
    data: UpdateEntitySchema,
  }),
  response: Type.Object({
    data: Type.String(),
  }),
});

export type EntityDoBarrelRoll = Static<typeof EntityDoBarrelRollSchema>;

// SERVICE

export interface EntityCrudService extends TPCore.crud.CrudService<
  Entity,
  CreateEntity,
  UpdateEntity,
  EntityFindOne['request']['params'],
  EntityFindAll['request']['query'],
  EntityFindAll['response']
  > {
  doBarrelRoll(request: EntityDoBarrelRoll['request']): Promise<EntityDoBarrelRoll['response']>;
}
