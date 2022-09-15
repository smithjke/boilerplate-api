export interface CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ONE_PARAMS, ALL_QUERY, ALL_RESPONSE> {
  create(request: { data: CREATE_ENTITY }): Promise<ENTITY>;

  update(request: { params: ONE_PARAMS, data: UPDATE_ENTITY }): Promise<ENTITY>;

  remove(request: { params: ONE_PARAMS }): Promise<void>;

  findOne(request: { params: ONE_PARAMS }): Promise<ENTITY>;

  findAll(request: { query: ALL_QUERY }): Promise<ALL_RESPONSE>;
}
