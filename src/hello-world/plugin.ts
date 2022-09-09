import { FastifyInstance } from 'fastify';
import TPServer from '~/2p-server';
import { HelloWorld } from '~/api';
import { useHelloWorldService } from './di';

export function plugin(fastifyInstance: FastifyInstance, opts: any, done: () => void) {
  const crudService = useHelloWorldService();

  // FIND ONE
  // fastifyInstance.route({
  //   method: 'GET',
  //   url: '/:id',
  //   schema: {
  //     params: TPCore.api.makeSingleParamsSchema(HelloWorld.EntitySchema.properties.id),
  //     response: {
  //       200: HelloWorld.EntitySchema,
  //     },
  //   },
  //   handler: async (request, reply) => {
  //     const { id } = request.params as TPCore.api.SingleParams<HelloWorld.Entity['id']>;
  //     const helloWorldService = useHelloWorldService();
  //     const entity = await helloWorldService.findOne(id);
  //     if (!entity) {
  //       reply.code(404);
  //       throw new Error(`No entity with id ${id}`);
  //     }
  //     return entity;
  //   },
  // });
  // fastifyInstance.route(
  //   TPCore.api.makeFindOneRoute({
  //     crudService,
  //     entityIdSchema: HelloWorld.EntitySchema.properties.id,
  //     entitySchema: HelloWorld.EntitySchema,
  //   }),
  // );

  // FIND ALL
  // fastifyInstance.route({
  //   method: 'GET',
  //   url: '',
  //   schema: {
  //     querystring: TPCore.crud.makeCrudListQuerySchema(
  //       HelloWorld.EntityQueryOrderFieldSchema,
  //       HelloWorld.EntityQueryFilterSchema,
  //     ),
  //     response: {
  //       200: TPCore.crud.makeCrudListResultSchema(HelloWorld.ListedEntitySchema),
  //     },
  //   },
  //   handler: async (request, reply) => {
  //     const helloWorldService = useHelloWorldService();
  //     return helloWorldService.findAll(request.query as TPCore.crud.CrudListQuery<HelloWorld.EntityQueryOrderField>);
  //   },
  // });
  // fastifyInstance.route(
  //   TPCore.api.makeFindAllRoute({
  //     crudService,
  //     entityQueryOrderFieldSchema: HelloWorld.EntityQueryOrderFieldSchema,
  //     entityQueryFilterSchema: HelloWorld.EntityQueryFilterSchema,
  //     listedEntitySchema: HelloWorld.ListedEntitySchema,
  //   }),
  // );

  // CREATE
  // fastifyInstance.route({
  //   method: 'POST',
  //   url: '',
  //   schema: {
  //     body: HelloWorld.CreateEntitySchema,
  //     response: {
  //       200: HelloWorld.EntitySchema,
  //     },
  //   },
  //   handler: async (request, reply) => {
  //     const helloWorldService = useHelloWorldService();
  //     const createData = request.body as HelloWorld.CreateEntity;
  //     return helloWorldService.create(createData);
  //   },
  // });
  // fastifyInstance.route(
  //   TPCore.api.makeCreateRoute({
  //     crudService,
  //     createEntitySchema: HelloWorld.CreateEntitySchema,
  //     entitySchema: HelloWorld.EntitySchema,
  //   }),
  // );

  // UPDATE
  // fastifyInstance.route({
  //   method: 'PUT',
  //   url: '/:id',
  //   schema: {
  //     params: TPCore.api.makeSingleParamsSchema(HelloWorld.EntitySchema.properties.id),
  //     body: HelloWorld.UpdateEntitySchema,
  //     response: {
  //       200: HelloWorld.EntitySchema,
  //     },
  //   },
  //   handler: async (request, reply) => {
  //     const { id } = request.params as TPCore.api.SingleParams<HelloWorld.Entity['id']>;
  //     const helloWorldService = useHelloWorldService();
  //     const updateData = request.body as HelloWorld.UpdateEntity;
  //     return helloWorldService.update(id, updateData);
  //   },
  // });
  // fastifyInstance.route(
  //   TPCore.api.makeUpdateRoute({
  //     crudService,
  //     entityIdSchema: HelloWorld.EntitySchema.properties.id,
  //     updateEntitySchema: HelloWorld.UpdateEntitySchema,
  //     entitySchema: HelloWorld.EntitySchema,
  //   }),
  // );

  // DELETE
  // fastifyInstance.route({
  //   method: 'DELETE',
  //   url: '/:id',
  //   schema: {
  //     params: TPCore.api.makeSingleParamsSchema(HelloWorld.EntitySchema.properties.id),
  //     response: {
  //       200: HelloWorld.EntitySchema,
  //     },
  //   },
  //   handler: async (request, reply) => {
  //     const { id } = request.params as TPCore.api.SingleParams<HelloWorld.Entity['id']>;
  //     const helloWorldService = useHelloWorldService();
  //     return helloWorldService.remove(id);
  //   },
  // });
  // fastifyInstance.route(
  //   TPCore.api.makeRemoveRoute({
  //     crudService,
  //     entityIdSchema: HelloWorld.EntitySchema.properties.id,
  //   }),
  // );

  TPServer.api.registerCrudRoutes({
    fastifyInstance,
    crudService,
    entityQueryOrderFieldSchema: HelloWorld.EntityQueryOrderFieldSchema,
    entityQueryFilterSchema: HelloWorld.EntityQueryFilterSchema,
    entityIdSchema: HelloWorld.EntitySchema.properties.id,
    entitySchema: HelloWorld.EntitySchema,
    listedEntitySchema: HelloWorld.ListedEntitySchema,
    createEntitySchema: HelloWorld.CreateEntitySchema,
    updateEntitySchema: HelloWorld.UpdateEntitySchema,
  });

  done();
}
