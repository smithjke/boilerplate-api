import TPCore from '~/2p-core';

export type Entity = {
  id: string;
  title: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

export const EntitySchema = {
  type: 'object',
  required: ['id', 'title', 'amount', 'createdAt', 'updatedAt'],
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    amount: {
      type: 'number',
    },
    createdAt: {
      type: 'number',
      format: 'date-and-time',
    },
    updatedAt: {
      type: 'number',
      format: 'date-and-time',
    },
  },
};

export type ListedEntity = Omit<Entity, 'createdAt' | 'updatedAt'>;

export const ListedEntitySchema = {
  type: 'object',
  required: ['title', 'amount'],
  additionalProperties: false,
  properties: {
    id: EntitySchema.properties.id,
    title: EntitySchema.properties.title,
    amount: EntitySchema.properties.amount,
  },
};

export type CreateEntity = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;

export const CreateEntitySchema = {
  type: 'object',
  required: ['title', 'amount'],
  additionalProperties: false,
  properties: {
    title: EntitySchema.properties.title,
    amount: EntitySchema.properties.amount,
  },
};

export type UpdateEntity = Partial<CreateEntity>;

export const UpdateEntitySchema = {
  type: 'object',
  additionalProperties: false,
  properties: CreateEntitySchema.properties,
};

export enum EntityCrudFindAllQueryOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
}

export const EntityCrudFindAllQueryOrderFieldSchema = {
  type: 'string',
  enum: Object.values(EntityCrudFindAllQueryOrderField),
};

export type EntityCrudFindAllQueryFilter = Partial<Pick<Entity, 'amount'>>;

export const EntityCrudFindAllQueryFilterSchema = {
  type: 'object',
  required: ['amount'],
  additionalProperties: false,
  properties: {
    amount: EntitySchema.properties.amount,
  },
};

export type EntityCrudService = TPCore.crud.CrudService<
  Entity,
  ListedEntity,
  CreateEntity,
  UpdateEntity,
  Entity['id'],
  EntityCrudFindAllQueryOrderField,
  EntityCrudFindAllQueryFilter
  >;

export type EntityCrudFindAllQuery = TPCore.crud.CrudListQuery<
  EntityCrudFindAllQueryOrderField,
  EntityCrudFindAllQueryFilter
  >;

export type EntityCrudFindAllResult = TPCore.crud.CrudListResult<ListedEntity>;
