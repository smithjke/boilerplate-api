import { CrudService } from '../crud';

export class CrudClient<
  ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESPONSE
  > implements CrudService<
  ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESPONSE
  > {
  create(request: { data: CREATE_ENTITY }): Promise<ENTITY> {
    return Promise.resolve(undefined);
  }

  findAll(request: { query: ALL_QUERY }): Promise<ALL_RESPONSE> {
    return Promise.resolve(undefined);
  }

  findOne(request: { params: ONE_PARAMS }): Promise<ENTITY> {
    return Promise.resolve(undefined);
  }

  remove(request: { params: ONE_PARAMS }): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(request: { params: ONE_PARAMS; data: UPDATE_ENTITY }): Promise<ENTITY> {
    return Promise.resolve(undefined);
  }
}
