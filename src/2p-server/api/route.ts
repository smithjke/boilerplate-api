import { FastifyInstance, RouteOptions } from 'fastify';
import TPCore from '~/2p-core';

export type FindOneRouteProps<E, C_E, U_E, L_E, K extends object, OF, F> = {
  crudService: TPCore.crud.CrudService<E, C_E, U_E, L_E, K, OF, F>;
  entityCrudFindOneParamsSchema: object;
  entitySchema: object;
};

export function makeFindOneRoute<E, C_E, U_E, L_E, K extends object, OF, F>(
  props: FindOneRouteProps<E, C_E, U_E, L_E, K, OF, F>,
): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.findOne.method as any,
    url: TPCore.crud.crudApiConfig.findOne.url,
    schema: {
      params: props.entityCrudFindOneParamsSchema,
      response: {
        200: props.entitySchema,
      },
    },
    handler: async (request, reply) => {
      try {
        return props.crudService.findOne(request.params as K);
      } catch (e) {
        reply.code(404);
        throw e;
      }
    },
  };
}

export type FindAllRouteProps<E, C_E, U_E, L_E, K extends object, OF, F> = {
  crudService: TPCore.crud.CrudService<E, C_E, U_E, L_E, K, OF, F>;
  entityCrudFindAllQuerySchema: object;
  entityCrudFindAllResultSchema: object;
};

export function makeFindAllRoute<E, C_E, U_E, L_E, K extends object, OF, F>(
  props: FindAllRouteProps<E, C_E, U_E, L_E, K, OF, F>
): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.findAll.method as any,
    url: TPCore.crud.crudApiConfig.findAll.url,
    schema: {
      querystring: props.entityCrudFindAllQuerySchema,
      response: {
        200: props.entityCrudFindAllResultSchema,
      },
    },
    handler: async (request, reply) => {
      return props.crudService.findAll(request.query as TPCore.crud.CrudListQuery<OF, F>);
    },
  };
}

export type CreateRouteProps<E, C_E, U_E, L_E, K extends object, OF, F> = {
  crudService: TPCore.crud.CrudService<E, C_E, U_E, L_E, K, OF, F>;
  createEntitySchema: object;
  entitySchema: object;
};

export function makeCreateRoute<E, C_E, U_E, L_E, K extends object, OF, F>(
  props: CreateRouteProps<E, C_E, U_E, L_E, K, OF, F>
): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.create.method as any,
    url: TPCore.crud.crudApiConfig.create.url,
    schema: {
      body: props.createEntitySchema,
      response: {
        200: props.entitySchema,
      },
    },
    handler: async (request, reply) => {
      return props.crudService.create(request.body as C_E);
    },
  };
}

export type UpdateRouteProps<E, C_E, U_E, L_E, K extends object, OF, F> = {
  crudService: TPCore.crud.CrudService<E, C_E, U_E, L_E, K, OF, F>;
  entityCrudFindOneParamsSchema: object;
  updateEntitySchema: object;
  entitySchema: object;
};

export function makeUpdateRoute<E, C_E, U_E, L_E, K extends object, OF, F>(
  props: UpdateRouteProps<E, C_E, U_E, L_E, K, OF, F>
): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.update.method as any,
    url: TPCore.crud.crudApiConfig.update.url,
    schema: {
      params: props.entityCrudFindOneParamsSchema,
      body: props.updateEntitySchema,
      response: {
        200: props.entitySchema,
      },
    },
    handler: async (request, reply) => {
      return props.crudService.update(
        request.body as U_E,
        request.params as K,
      );
    },
  };
}

export type RemoveRouteProps<E, C_E, U_E, L_E, K extends object, OF, F> = {
  crudService: TPCore.crud.CrudService<E, C_E, U_E, L_E, K, OF, F>;
  entityCrudFindOneParamsSchema: object;
};

export function makeRemoveRoute<E, C_E, U_E, L_E, K extends object, OF, F>(
  props: RemoveRouteProps<E, C_E, U_E, L_E, K, OF, F>
): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.remove.method as any,
    url: TPCore.crud.crudApiConfig.remove.url,
    schema: {
      params: props.entityCrudFindOneParamsSchema,
    },
    handler: async (request, reply) => {
      return props.crudService.remove(request.params as K);
    },
  };
}

export type RegisterCrudRoutesProps<E, C_E, U_E, L_E, K extends object, OF, F> = {
  fastifyInstance: FastifyInstance;
  crudService: TPCore.crud.CrudService<E, C_E, U_E, L_E, K, OF, F>;
  entitySchema: object;
  createEntitySchema: object;
  updateEntitySchema: object;
  entityCrudFindAllQuerySchema: object;
  entityCrudFindAllResultSchema: object;
  entityCrudFindOneParamsSchema: object;
};

export function registerCrudRoutes<E, C_E, U_E, L_E, K extends object, OF, F>(
  props: RegisterCrudRoutesProps<E, C_E, U_E, L_E, K, OF, F>,
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
