import { Static, Type } from '@sinclair/typebox';
import TPCore from '~/2p-core';

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

// DO BARREL ROLL

export const doBarrelRollRequest = Type.Object({
  params: entityKey,
  data: updateEntity,
});

export const doBarrelRollResponse = Type.Object({
  data: Type.String(),
});

export const doBarrelRoll = TPCore.crud.Method(doBarrelRollRequest, doBarrelRollResponse,);

export type DoBarrelRollRequest = Static<typeof doBarrelRollRequest>;

export type DoBarrelRollResponse = Static<typeof doBarrelRollResponse>;

export type DoBarrelRoll = Static<typeof doBarrelRoll>;

// CRUD

export const crud = TPCore.crud.Crud({
  entity,
  createEntity,
  updateEntity,
  listedEntity,
  entityKey,
  entityOrderField,
  entityFilter,
});

export type Crud = Static<typeof crud>;

// SERVICE

export const service = Type.Intersect([
  crud,
  Type.Object({
    doBarrelRoll,
  }),
]);

export type Service = Static<typeof service>;
