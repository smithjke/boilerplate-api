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

// FIND ALL

export enum EntityFindAllQueryOrderField {
  ID = 'id',
  TITLE = 'title',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export type EntityFindAllQueryFilter = Partial<Pick<Entity, 'amount'>>;

export type EntityFindAll = {
  request: {
    query: TPCore.crud.CrudListQuery<
      EntityFindAllQueryOrderField,
      EntityFindAllQueryFilter
      >;
  };
  response: TPCore.crud.CrudListResult<ListedEntity>;
};

export const EntityFindAllSchema = {
  request: {
    query: TPCore.crud.makeCrudListQuerySchema(
      {
        type: 'string',
        enum: Object.values(EntityFindAllQueryOrderField),
      },
      {
        type: 'object',
        required: ['amount'],
        additionalProperties: false,
        properties: {
          amount: EntitySchema.properties.amount,
        },
      },
    ),
  },
  response: TPCore.crud.makeCrudListResultSchema(ListedEntitySchema),
};

// FIND ONE

export type EntityFindOne = {
  request: {
    params: TPCore.api.SingleParams<Entity['id']>;
  };
};

export const EntityFindOneSchema = {
  request: {
    params: TPCore.api.makeSingleParamsSchema(EntitySchema.properties.id),
  },
};

// DO BARREL ROLL

export type EntityDoBarrelRoll = {
  request: {
    params: EntityFindOne['request']['params'];
    data: UpdateEntity;
  };
  response: string;
};

export const EntityDoBarrelRollSchema = {
  request: {
    params: EntityFindOneSchema.request.params,
    data: UpdateEntitySchema,
  },
  response: {
    type: 'string',
  },
};

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
