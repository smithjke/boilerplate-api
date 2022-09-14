import { Static, TSchema } from '@sinclair/typebox';
import { CrudService } from '../crud';

export abstract class CrudClient implements CrudService<any, any, any, any, any, any> {
  create(request: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  findAll(request: { query: any }): Promise<any> {
    return Promise.resolve(undefined);
  }

  findOne(request: { params: any }): Promise<any> {
    return Promise.resolve(undefined);
  }

  remove(request: { params: any }): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(request: { params: any; data: any }): Promise<any> {
    return Promise.resolve(undefined);
  }
}

export function createCrudClient<T extends TSchema>(crud: T): Static<typeof crud> {
  throw new Error('lol');
}
