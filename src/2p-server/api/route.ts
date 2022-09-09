import { FastifyInstance, RouteOptions } from 'fastify';
import TPCore from '~/2p-core';

export type FindOneRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>;
  entityIdSchema: object;
  entitySchema: object;
};

export function makeFindOneRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>(
  props: FindOneRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>,
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

export type FindAllRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>;
  entityCrudFindAllQueryOrderFieldSchema: object;
  entityCrudFindAllQueryFilterSchema: object;
  listedEntitySchema: object;
};

export function makeFindAllRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>(
  props: FindAllRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>
): RouteOptions {
  return {
    method: 'GET',
    url: '',
    schema: {
      querystring: TPCore.crud.makeCrudListQuerySchema(
        props.entityCrudFindAllQueryOrderFieldSchema,
        props.entityCrudFindAllQueryFilterSchema,
      ),
      response: {
        200: TPCore.crud.makeCrudListResultSchema(props.listedEntitySchema),
      },
    },
    handler: async (request, reply) => {
      return props.crudService.findAll(request.query as TPCore.crud.CrudListQuery<OF, F>);
    },
  };
}

export type CreateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>;
  createEntitySchema: object;
  entitySchema: object;
};

export function makeCreateRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>(
  props: CreateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>
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

export type UpdateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>;
  entityIdSchema: object;
  updateEntitySchema: object;
  entitySchema: object;
};

export function makeUpdateRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>(
  props: UpdateRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>
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

export type RemoveRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F> = {
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>;
  entityIdSchema: object;
};

export function makeRemoveRoute<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>(
  props: RemoveRouteProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>
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

export type RegisterCrudRoutesProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F> = {
  fastifyInstance: FastifyInstance;
  crudService: TPCore.crud.CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>;
  entityCrudFindAllQueryOrderFieldSchema: object;
  entityCrudFindAllQueryFilterSchema: object;
  entityIdSchema: object;
  entitySchema: object;
  listedEntitySchema: object;
  createEntitySchema: object;
  updateEntitySchema: object;
};

export function registerCrudRoutes<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>(
  props: RegisterCrudRoutesProps<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, OF, F>,
) {
  const {
    fastifyInstance,
    crudService,
    entityCrudFindAllQueryOrderFieldSchema,
    entityCrudFindAllQueryFilterSchema,
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
      entityCrudFindAllQueryOrderFieldSchema,
      entityCrudFindAllQueryFilterSchema,
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
