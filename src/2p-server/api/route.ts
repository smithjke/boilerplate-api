import { FastifyInstance, RouteOptions } from 'fastify';
import TPCore from '~/2p-core';

export type FindOneRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>;
  entityIdSchema: object;
  entitySchema: object;
};

export function makeFindOneRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>(
  props: FindOneRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>,
): RouteOptions {
  return {
    method: 'GET',
    url: '/:id',
    schema: {
      params: TPCore.api.makeSingleParamsSchema(props.entityIdSchema),
      response: {
        200: props.entitySchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as TPCore.api.SingleParams<ID>;
      const entity = await props.crudService.findOne(id);
      if (!entity) {
        reply.code(404);
        throw new Error(`No entity with id ${id}`);
      }
      return entity;
    },
  };
}

export type FindAllRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>;
  entityQueryOrderFieldSchema: object;
  entityQueryFilterSchema: object;
  listedEntitySchema: object;
};

export function makeFindAllRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>(
  props: FindAllRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>
): RouteOptions {
  return {
    method: 'GET',
    url: '',
    schema: {
      querystring: TPCore.crud.makeCrudListQuerySchema(
        props.entityQueryOrderFieldSchema,
        props.entityQueryFilterSchema,
      ),
      response: {
        200: TPCore.crud.makeCrudListResultSchema(props.listedEntitySchema),
      },
    },
    handler: async (request, reply) => {
      return props.crudService.findAll(request.query as TPCore.crud.CrudListQuery);
    },
  };
}

export type CreateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>;
  createEntitySchema: object;
  entitySchema: object;
};

export function makeCreateRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>(
  props: CreateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>
): RouteOptions {
  return {
    method: 'POST',
    url: '',
    schema: {
      body: props.createEntitySchema,
      response: {
        200: props.entitySchema,
      },
    },
    handler: async (request, reply) => {
      const createData = request.body as CREATE_ENTITY;
      return props.crudService.create(createData);
    },
  };
}

export type UpdateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>;
  entityIdSchema: object;
  updateEntitySchema: object;
  entitySchema: object;
};

export function makeUpdateRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>(
  props: UpdateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>
): RouteOptions {
  return {
    method: 'PUT',
    url: '/:id',
    schema: {
      params: TPCore.api.makeSingleParamsSchema(props.entityIdSchema),
      body: props.updateEntitySchema,
      response: {
        200: props.entitySchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as TPCore.api.SingleParams<ID>;
      const updateData = request.body as UPDATE_ENTITY;
      return props.crudService.update(id, updateData);
    },
  };
}

export type RemoveRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>;
  entityIdSchema: object;
};

export function makeRemoveRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>(
  props: RemoveRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>
): RouteOptions {
  return {
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: TPCore.api.makeSingleParamsSchema(props.entityIdSchema),
    },
    handler: async (request, reply) => {
      const { id } = request.params as TPCore.api.SingleParams<ID>;
      return props.crudService.remove(id);
    },
  };
}

export type RegisterCrudRoutesProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> = {
  fastifyInstance: FastifyInstance;
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>;
  entityQueryOrderFieldSchema: object;
  entityQueryFilterSchema: object;
  entityIdSchema: object;
  entitySchema: object;
  listedEntitySchema: object;
  createEntitySchema: object;
  updateEntitySchema: object;
};

export function registerCrudRoutes<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>(
  props: RegisterCrudRoutesProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID>,
) {
  const {
    fastifyInstance,
    crudService,
    entityQueryOrderFieldSchema,
    entityQueryFilterSchema,
    entityIdSchema,
    entitySchema,
    listedEntitySchema,
    createEntitySchema,
    updateEntitySchema,
  } = props;

  fastifyInstance.route(
    makeFindOneRoute({
      crudService,
      entityIdSchema,
      entitySchema,
    }),
  );

  fastifyInstance.route(
    makeFindAllRoute({
      crudService,
      entityQueryOrderFieldSchema,
      entityQueryFilterSchema,
      listedEntitySchema,
    }),
  );

  fastifyInstance.route(
    makeCreateRoute({
      crudService,
      createEntitySchema,
      entitySchema,
    }),
  );

  fastifyInstance.route(
    makeUpdateRoute({
      crudService,
      entityIdSchema,
      updateEntitySchema,
      entitySchema,
    }),
  );

  fastifyInstance.route(
    makeRemoveRoute({
      crudService,
      entityIdSchema,
    }),
  );
}
