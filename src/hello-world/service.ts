import TPCore from '~/2p-core';
import { HelloWorld } from '~/api';

const firstDate = new Date();

type ServiceFindAllQuery = TPCore.crud.CrudListQuery<
  HelloWorld.EntityQueryOrderField,
  HelloWorld.EntityQueryFilter
  >;

type ServiceInterface = TPCore.crud.CrudService<
  HelloWorld.Entity,
  HelloWorld.ListedEntity,
  HelloWorld.CreateEntity,
  HelloWorld.UpdateEntity,
  HelloWorld.Entity['id']
  >;

export class Service implements ServiceInterface {
  private items: Array<HelloWorld.Entity> = [
    {
      id: '10',
      title: 'Lol',
      amount: 5,
      createdAt: firstDate,
      updatedAt: firstDate,
    },
    {
      id: '11',
      title: 'Kek',
      amount: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async create(createData: HelloWorld.CreateEntity): Promise<HelloWorld.Entity> {
    const date = new Date;
    const item = {
      id: String(Math.round(Math.random() * 1000)),
      ...createData,
      createdAt: date,
      updatedAt: date,
    };
    this.items.push(item);
    return item;
  }

  async update(id: HelloWorld.Entity['id'], updateData: HelloWorld.UpdateEntity): Promise<HelloWorld.Entity> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items[i] = {
          ...this.items[i],
          ...updateData,
          updatedAt: new Date(),
        };
        return this.items[i];
      }
    }
    throw new Error('No item');
  }

  async remove(id: HelloWorld.Entity['id']): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        return;
      }
    }
    throw new Error('No item');
  }

  async findOne(id: HelloWorld.Entity['id']): Promise<HelloWorld.Entity> {
    const item = await this.items.find((item) => item.id === id);
    if (item) {
      return item;
    }
    throw new Error('No item');
  }

  async findAll(query: ServiceFindAllQuery): Promise<TPCore.crud.CrudListResult<HelloWorld.ListedEntity>> {
    const {
      limit = 10,
      offset = 0,
      order = { field: 'id', direction: 'asc' },
      filter = {},
    } = query;
    const list = this.items
      .filter(Boolean)
      .sort((a, b) => {
        return order.direction === 'asc'
          ? Number(a[order.field]) - Number(b[order.field])
          : Number(b[order.field]) - Number(a[order.field]);
      });
    return {
      list: list.slice(offset, offset + limit),
      total: list.length,
    };
  }
}
