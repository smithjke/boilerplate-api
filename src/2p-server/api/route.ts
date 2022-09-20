import { FastifyInstance, RouteOptions } from 'fastify';
import TPCore from '~/2p-core';

export type FindOneRouteProps<T extends TPCore.crud.AnyCrudType> = {
  crudService: TPCore.crud.CrudService<T>;
  crudSchema: TPCore.crud.CrudSchema;
};

export function makeFindOneRoute<T extends TPCore.crud.AnyCrudType>(props: FindOneRouteProps<T>): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.findOne.method as any,
    url: TPCore.crud.crudApiConfig.findOne.url,
    schema: {
      params: props.crudSchema.entityKey,
      response: {
        200: props.crudSchema.entity,
      },
    },
    handler: async (request, reply) => {
      try {
        return props.crudService.findOne(request.params as object);
      } catch (e) {
        reply.code(404);
        throw e;
      }
    },
  };
}

export type FindAllRouteProps<T extends TPCore.crud.AnyCrudType> = {
  crudService: TPCore.crud.CrudService<T>;
  crudSchema: TPCore.crud.CrudSchema;
};

export function makeFindAllRoute<T extends TPCore.crud.AnyCrudType>(props: FindAllRouteProps<T>): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.findAll.method as any,
    url: TPCore.crud.crudApiConfig.findAll.url,
    schema: {
      querystring: TPCore.crud.makeCrudListQuerySchema(
        props.crudSchema.entityOrderField,
        props.crudSchema.entityFilter,
        ),
      response: {
        200: TPCore.crud.makeCrudListResultSchema(props.crudSchema.listedEntity),
      },
    },
    handler: async (request, reply) => {
      return props.crudService.findAll(request.query as TPCore.crud.CrudListQuery);
    },
  };
}

export type CreateRouteProps<T extends TPCore.crud.AnyCrudType> = {
  crudService: TPCore.crud.CrudService<T>;
  crudSchema: TPCore.crud.CrudSchema;
};

export function makeCreateRoute<T extends TPCore.crud.AnyCrudType>(props: CreateRouteProps<T>): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.create.method as any,
    url: TPCore.crud.crudApiConfig.create.url,
    schema: {
      body: props.crudSchema.createEntity,
      response: {
        200: props.crudSchema.entity,
      },
    },
    handler: async (request, reply) => {
      return props.crudService.create(request.body as object);
    },
  };
}

export type UpdateRouteProps<T extends TPCore.crud.AnyCrudType> = {
  crudService: TPCore.crud.CrudService<T>;
  crudSchema: TPCore.crud.CrudSchema;
};

export function makeUpdateRoute<T extends TPCore.crud.AnyCrudType>(props: UpdateRouteProps<T>): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.update.method as any,
    url: TPCore.crud.crudApiConfig.update.url,
    schema: {
      params: props.crudSchema.entityKey,
      body: props.crudSchema.updateEntity,
      response: {
        200: props.crudSchema.entity,
      },
    },
    handler: async (request, reply) => {
      return props.crudService.update(
        request.body as object,
        request.params as object,
      );
    },
  };
}

export type RemoveRouteProps<T extends TPCore.crud.AnyCrudType> = {
  crudService: TPCore.crud.CrudService<T>;
  crudSchema: TPCore.crud.CrudSchema;
};

export function makeRemoveRoute<T extends TPCore.crud.AnyCrudType>(props: RemoveRouteProps<T>): RouteOptions {
  return {
    method: TPCore.crud.crudApiConfig.remove.method as any,
    url: TPCore.crud.crudApiConfig.remove.url,
    schema: {
      params: props.crudSchema.entityKey,
    },
    handler: async (request, reply) => {
      return props.crudService.remove(request.params as object);
    },
  };
}

export type RegisterCrudRoutesProps<T extends TPCore.crud.AnyCrudType> = {
  fastifyInstance: FastifyInstance;
  crudService: TPCore.crud.CrudService<T>;
  crudSchema: TPCore.crud.CrudSchema;
};

export function registerCrudRoutes<T extends TPCore.crud.AnyCrudType>(props: RegisterCrudRoutesProps<T>) {
  const {
    fastifyInstance,
    crudService,
    crudSchema,
  } = props;

  fastifyInstance.route(
    makeFindOneRoute({
      crudService,
      crudSchema,
    }),
  );

  fastifyInstance.route(
    makeFindAllRoute({
      crudService,
      crudSchema,
    }),
  );

  fastifyInstance.route(
    makeCreateRoute({
      crudService,
      crudSchema,
    }),
  );

  fastifyInstance.route(
    makeUpdateRoute({
      crudService,
      crudSchema,
    }),
  );

  fastifyInstance.route(
    makeRemoveRoute({
      crudService,
      crudSchema,
    }),
  );
}
