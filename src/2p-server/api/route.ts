import { FastifyInstance, RouteOptions } from 'fastify';
import TPCore from '~/2p-core';

export type FindOneRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>;
  entityCrudFindOneParamsSchema: object;
  entitySchema: object;
};

export function makeFindOneRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>(
  props: FindOneRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>,
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
      try {
        return props.crudService.findOne({
          params: request.params as ONE_PARAMS,
        });
      } catch (e) {
        reply.code(404);
        throw e;
      }
    },
  };
}

export type FindAllRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>;
  entityCrudFindAllQuerySchema: object;
  entityCrudFindAllResultSchema: object;
};

export function makeFindAllRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>(
  props: FindAllRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>
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
      return props.crudService.findAll({
        query: request.query as ALL_QUERY,
      });
    },
  };
}

export type CreateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>;
  createEntitySchema: object;
  entitySchema: object;
};

export function makeCreateRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>(
  props: CreateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>
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
      return props.crudService.create({
        data: request.body as CREATE_ENTITY,
      });
    },
  };
}

export type UpdateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>;
  entityCrudFindOneParamsSchema: object;
  updateEntitySchema: object;
  entitySchema: object;
};

export function makeUpdateRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>(
  props: UpdateRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>
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
      return props.crudService.update({
        params: request.params as ONE_PARAMS,
        data: request.body as UPDATE_ENTITY,
      });
    },
  };
}

export type RemoveRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT> = {
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>;
  entityCrudFindOneParamsSchema: object;
};

export function makeRemoveRoute<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>(
  props: RemoveRouteProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>
): RouteOptions {
  return {
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: props.entityCrudFindOneParamsSchema,
    },
    handler: async (request, reply) => {
      return props.crudService.remove({
        params: request.params as ONE_PARAMS,
      });
    },
  };
}

export type RegisterCrudRoutesProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT> = {
  fastifyInstance: FastifyInstance;
  crudService: TPCore.crud.CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>;
  entitySchema: object;
  createEntitySchema: object;
  updateEntitySchema: object;
  entityCrudFindAllQuerySchema: object;
  entityCrudFindAllResultSchema: object;
  entityCrudFindOneParamsSchema: object;
};

export function registerCrudRoutes<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>(
  props: RegisterCrudRoutesProps<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESULT>,
) {
  const {
    fastifyInstance,
    crudService,
    entitySchema,
    createEntitySchema,
    updateEntitySchema,
    entityCrudFindAllQuerySchema,
    entityCrudFindAllResultSchema,
    entityCrudFindOneParamsSchema,
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
