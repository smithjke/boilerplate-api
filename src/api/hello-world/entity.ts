import { Static, Type } from '@sinclair/typebox';
import TPCore from '~/2p-core';

export const entity = Type.Object({
  id: Type.String(),
  title: Type.String(),
  amount: Type.Number(),
  createdAt: Type.Integer(),
  updatedAt: Type.Integer(),
});

export const createEntity = Type.Omit(entity, [
  'id',
  'createdAt',
  'updatedAt',
]);

export const updateEntity = Type.Partial(createEntity);

export const listedEntity = Type.Omit(entity, [
  'createdAt',
  'updatedAt',
]);

export const entityKey = Type.Pick(entity, [
  'id',
]);

export const entityFilter = Type.Object({
  amount: Type.Optional(
    Type.Union([
      Type.Number(),
      Type.Object({
        lt: Type.Number(),
      }),
      Type.Object({
        gt: Type.Number(),
      }),
    ]),
  ),
});

export enum EntityOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export const entityOrderField = Type.Enum(EntityOrderField);

export type Entity = Static<typeof entity>;
export type CreateEntity = Static<typeof createEntity>;
export type UpdateEntity = Static<typeof updateEntity>;
export type ListedEntity = Static<typeof listedEntity>;
export type EntityKey = Static<typeof entityKey>;
export type EntityFilter = Static<typeof entityFilter>;

export const crudSchema: TPCore.crud.CrudSchema = {
  entity,
  createEntity,
  updateEntity,
  listedEntity,
  entityKey,
  entityFilter,
  entityOrderField,
};

export type EntityCrudType = TPCore.crud.CrudType<
  Entity,
  CreateEntity,
  UpdateEntity,
  ListedEntity,
  EntityKey,
  EntityFilter,
  EntityOrderField
  >;
