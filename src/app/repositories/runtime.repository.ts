import { Static, Type } from '@sinclair/typebox';
import { CrudFindAllQuery, CrudFindAllResult } from '@smithjke/2p-core/crud';

const baseType = Type.Object({
  id: Type.String(),
  createdAt: Type.Integer(),
  updatedAt: Type.Integer(),
});

type BaseType = Static<typeof baseType>;

export class RuntimeRepository<E extends BaseType> {
  private list: Array<E>;

  constructor(list: Array<E>) {
    this.list = list;
  }

  async create(data: Omit<E, 'id' | 'createdAt' | 'updatedAt'>): Promise<E> {
    const currentDate = Number(new Date());
    const item: any = {
      ...data,
      id: String(Math.random()),
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.list.push(item);
    return item;
  }

  async update(data: Partial<Omit<E, 'id' | 'createdAt' | 'updatedAt'>>, id: BaseType['id']): Promise<E> {
    const item = await this.findOne({ id });
    if (item) {
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        item[key] = data[key];
        item.updatedAt = Number(new Date());
      });
      return item;
    }
    throw new Error('Not Found');
  }

  async remove(id: BaseType['id']): Promise<void> {
    const item = await this.findOne({ id });
    if (!item) {
      throw new Error('Not Found');
    }
    this.list.splice(this.list.indexOf(item), 1);
  }

  async findOne(filter: any): Promise<E> {
    if (typeof filter !== 'object') {
      throw new Error('No Filter');
    }
    const keys = Object.keys(filter);
    if (!keys.length) {
      throw new Error('No Filter Keys');
    }
    const item = this.list.find((item) => {
      for (const key of keys) {
        // @ts-ignore
        if (item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
    if (item) {
      return item;
    }
    throw new Error('Not Found');
  }

  async findAll(query?: CrudFindAllQuery<any>): Promise<CrudFindAllResult<any>> {
    const {
      limit = 10,
      offset = 0,
      order = { field: 'id', direction: 'asc' },
      filter,
    } = query || {};
    const list = this.list.filter((entity) => {
      if (filter && typeof filter === 'object') {
        for (const key of Object.keys(filter)) {
          // @ts-ignore
          if (entity[key] === filter[key]) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    });
    return {
      list: list.slice(offset, offset + limit),
      total: list.length,
    };
  }
}
