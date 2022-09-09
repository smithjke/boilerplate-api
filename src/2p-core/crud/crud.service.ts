import { CrudListQuery, CrudListResult } from './crud-list';

export interface CrudService<ENTITY, LISTED_ENTITY, CREATE_ENTITY, UPDATE_ENTITY, ID> {
  create(createData: CREATE_ENTITY): Promise<ENTITY>;

  update(id: ID, updateData: UPDATE_ENTITY): Promise<ENTITY>;

  remove(id: ID): Promise<void>;

  findOne(id: ID): Promise<ENTITY>;

  findAll(query: CrudListQuery): Promise<CrudListResult<LISTED_ENTITY>>;
}
