import { FastifyInstance, RouteOptions } from 'fastify';
import TPCore from '~/2p-core';

export type FindOneRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>;
  entityCrudFindOneParamsSchema: object;
  entitySchema: object;
};

export function makeFindOneRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>(
  props: FindOneRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>,
): RouteOptions {
  return {
    method: 'GET',
    url: '/:id',
    schema: {
      params: props.entityCrudFindOneParamsSchema,
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

export type FindAllRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>;
  entityCrudFindAllQuerySchema: object;
  entityCrudFindAllResultSchema: object;
};

export function makeFindAllRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>(
  props: FindAllRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>
): RouteOptions {
  return {
    method: 'GET',
    url: '',
    schema: {
      querystring: props.entityCrudFindAllQuerySchema,
      response: {
        200: props.entityCrudFindAllResultSchema,
      },
    },
    handler: async (request, reply) => {
      return props.crudService.findAll(request.query as FA_Q);
    },
  };
}

export type CreateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>;
  createEntitySchema: object;
  entitySchema: object;
};

export function makeCreateRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>(
  props: CreateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>
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

export type UpdateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>;
  entityCrudFindOneParamsSchema: object;
  updateEntitySchema: object;
  entitySchema: object;
};

export function makeUpdateRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>(
  props: UpdateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>
): RouteOptions {
  return {
    method: 'PUT',
    url: '/:id',
    schema: {
      params: props.entityCrudFindOneParamsSchema,
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

export type RemoveRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>;
  entityCrudFindOneParamsSchema: object;
};

export function makeRemoveRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>(
  props: RemoveRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>
): RouteOptions {
  return {
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: props.entityCrudFindOneParamsSchema,
    },
    handler: async (request, reply) => {
      const { id } = request.params as TPCore.api.SingleParams<ID>;
      return props.crudService.remove(id);
    },
  };
}

export type RegisterCrudRoutesProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> = {
  fastifyInstance: FastifyInstance;
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>;
  entityCrudFindAllQuerySchema: object;
  entityCrudFindAllResultSchema: object;
  entityCrudFindOneParamsSchema: object;
  entitySchema: object;
  createEntitySchema: object;
  updateEntitySchema: object;
};

export function registerCrudRoutes<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>(
  props: RegisterCrudRoutesProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R>,
) {
  const {
    fastifyInstance,
    crudService,
    entityCrudFindAllQuerySchema,
    entityCrudFindAllResultSchema,
    entityCrudFindOneParamsSchema,
    entitySchema,
    createEntitySchema,
    updateEntitySchema,
  } = props;

  fastifyInstance.route(
    makeFindOneRoute({
      crudService,
      entityCrudFindOneParamsSchema,
      entitySchema,
    }),
  );

  fastifyInstance.route(
    makeFindAllRoute({
      crudService,
      entityCrudFindAllQuerySchema,
      entityCrudFindAllResultSchema,
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
      entityCrudFindOneParamsSchema,
      updateEntitySchema,
      entitySchema,
    }),
  );

  fastifyInstance.route(
    makeRemoveRoute({
      crudService,
      entityCrudFindOneParamsSchema,
    }),
  );
}
