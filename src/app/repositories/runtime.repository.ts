import { uuid } from '@smithjke/2p-core';
import * as Base from './base.repository';

function checkFilter<E extends Base.Entity>(entity: E, filter: Base.Filter<E>): boolean {
  const entries = Object.entries(filter);

  for (const [key, value] of entries) {
    // @ts-ignore
    const row = entity[key];

    if (typeof value === 'string') {
      // in this case we need !=
      if (row != value) return false;
    } else {
      if (value.gt) {
        if (typeof row !== 'number') {
          throw new Error(`Field ${key} is not number`);
        }
        if (row <= value.gt) return false;
      }
      if (value.lt) {
        if (typeof row !== 'number') {
          throw new Error(`Field ${key} is not number`);
        }
        if (row >= value.lt) return false;
      }
      if (value.equal) {
        if (row != value) return false;
      }
      if (value.like) {
        if (!String(row).includes(value)) return false;
      }
    }
  }

  return true;
}

export class RuntimeRepository<E extends Base.Entity> implements Base.BaseRepository<E> {
  private readonly list: Array<E>;

  constructor(list: Array<E>) {
    this.list = list;
  }

  async create(data: Base.CreateEntity<E>): Promise<E> {
    const currentDate = Number(new Date());

    const item: any = {
      ...data,
      id: uuid(),
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    this.list.push(item);

    return item;
  }

  async update(data: Base.UpdateEntity<E>, filter: Base.Filter<E>): Promise<E | null> {
    for (let i = 0; i < this.list.length; i++) {
      if (checkFilter(this.list[i], filter)) {
        this.list[i] = {
          ...this.list[i],
          ...data,
        };
        return this.list[i];
      }
    }

    return null;
  }

  async remove(filter: Base.Filter<E>): Promise<boolean> {
    for (let i = 0; i < this.list.length; i++) {
      if (checkFilter(this.list[i], filter)) {
        this.list.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  async findOne(filter: Base.Filter<E>): Promise<E | null> {
    for (let i = 0; i < this.list.length; i++) {
      if (checkFilter(this.list[i], filter)) {
        return this.list[i];
      }
    }

    return null;
  }

  async findAll(cursor: Base.Cursor, filter?: Base.Filter<E>): Promise<Base.ListedResult<E>> {
    const {
      limit = 10,
      offset = 0,
      order = [{ field: 'id', direction: 'asc' }],
    } = cursor || {};

    const orderedList = this.list.sort();
    const list: Array<E> = [];
    let offsetCount = 0;

    for (let i = 0; i < orderedList.length; i++) {
      if (filter ? checkFilter(orderedList[i], filter) : true) {
        if (offsetCount === offset) {
          list.push(orderedList[i]);
        } else {
          offsetCount++;
        }
      }
      if (list.length === limit) break;
    }

    return {
      list,
      total: list.length,
    };
  }
}
