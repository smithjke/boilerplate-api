import { HelloWorld } from '~/api';

const firstDate = new Date();

export class Service implements HelloWorld.EntityCrudService {
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

  async create(request: { data: HelloWorld.CreateEntity }): Promise<HelloWorld.Entity> {
    const date = new Date;
    const item = {
      id: String(Math.round(Math.random() * 1000)),
      ...request.data,
      createdAt: date,
      updatedAt: date,
    };
    this.items.push(item);
    return item;
  }

  async update(request: { params: HelloWorld.EntityFindOne['request']['params'], data: HelloWorld.UpdateEntity }): Promise<HelloWorld.Entity> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === request.params.id) {
        this.items[i] = {
          ...this.items[i],
          ...request.data,
          updatedAt: new Date(),
        };
        return this.items[i];
      }
    }
    throw new Error('No item');
  }

  async remove(request: { params: HelloWorld.EntityFindOne['request']['params'] }): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === request.params.id) {
        this.items.splice(i, 1);
        return;
      }
    }
    throw new Error('No item');
  }

  async findOne(request: { params: HelloWorld.EntityFindOne['request']['params'] }): Promise<HelloWorld.Entity> {
    const item = await this.items.find((item) => item.id === request.params.id);
    if (item) {
      return item;
    }
    throw new Error('No item');
  }

  async findAll(request: { query: HelloWorld.EntityFindAll['request']['query'] }): Promise<HelloWorld.EntityFindAll['response']> {
    const {
      limit = 10,
      offset = 0,
      order = { field: 'id', direction: 'asc' },
      filter = {},
    } = request.query;
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

  async doBarrelRoll(request: HelloWorld.EntityDoBarrelRoll['request']): Promise<HelloWorld.EntityDoBarrelRoll['response']> {
    console.log('doBarrelRoll.request >>>', request);
    return `Do Barrel Roll: ${request.params.id}`;
  }
}
