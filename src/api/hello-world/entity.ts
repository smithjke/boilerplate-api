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

export enum EntityQueryOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
}

export const EntityQueryOrderFieldSchema = {
  type: 'string',
  enum: Object.values(EntityQueryOrderField),
};

export type EntityQueryFilter = Partial<Pick<Entity, 'amount'>>;

export const EntityQueryFilterSchema = {
  type: 'object',
  required: ['amount'],
  additionalProperties: false,
  properties: {
    amount: EntitySchema.properties.amount,
  },
};
