import { Static, Type } from '@sinclair/typebox';

// ENTITY

export const entity = Type.Object({
  id: Type.String(),
  title: Type.String(),
  amount: Type.Number(),
  createdAt: Type.Integer(),
  updatedAt: Type.Integer(),
});

export type Entity = Static<typeof entity>;

// CREATE ENTITY

export const createEntity = Type.Omit(entity, [
  'id',
  'createdAt',
  'updatedAt',
]);

export type CreateEntity = Static<typeof createEntity>;

// UPDATE ENTITY

export const updateEntity = Type.Partial(createEntity);

export type UpdateEntity = Static<typeof updateEntity>;

// LISTED ENTITY

export const listedEntity = Type.Omit(entity, [
  'createdAt',
  'updatedAt',
]);

export type ListedEntity = Static<typeof listedEntity>;

// ENTITY KEY

export const entityKey = Type.Pick(entity, ['id']);

export type EntityKey = Static<typeof entityKey>;

// ENTITY FILTER

export const entityFilter = Type.Object({
  amount: Type.Optional(Type.Union([
    Type.Number(),
    Type.Object({
      lt: Type.Number(),
    }),
    Type.Object({
      gt: Type.Number(),
    }),
  ])),
});

export type EntityFilter = Static<typeof entityFilter>;

// ENTITY ORDER FIELD

export enum EntityOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export const entityOrderField = Type.Enum(EntityOrderField);
