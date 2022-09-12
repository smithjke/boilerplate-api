export interface CrudService<ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID, FA_Q, FA_R> {
  create(createData: CREATE_ENTITY): Promise<ENTITY>;

  update(id: ID, updateData: UPDATE_ENTITY): Promise<ENTITY>;

  remove(id: ID): Promise<void>;

  findOne(id: ID): Promise<ENTITY>;

  findAll(query: FA_Q): Promise<FA_R>;
}
