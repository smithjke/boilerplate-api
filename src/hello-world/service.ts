import { HelloWorld } from '~/api';
import { CrudListQuery, CrudListResult } from '2p-core/crud';

const currentDate = Date.now();

export class Service implements HelloWorld.EntityService {
  private items: Array<HelloWorld.Entity> = [
    {
      id: '10',
      title: 'Lol',
      amount: 5,
      createdAt: currentDate - 10000,
      updatedAt: currentDate - 10000,
    },
    {
      id: '11',
      title: 'Kek',
      amount: 3,
      createdAt: currentDate - 1000,
      updatedAt: currentDate - 1000,
    },
  ];

  async create(data: HelloWorld.CreateEntity): Promise<HelloWorld.Entity> {
    const date = Date.now();
    const item = {
      id: String(Math.round(Math.random() * 1000)),
      ...data,
      createdAt: date,
      updatedAt: date,
    };
    this.items.push(item);
    return item;
  }

  async update(data: HelloWorld.UpdateEntity, params: HelloWorld.EntityKey): Promise<HelloWorld.Entity> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === params.id) {
        this.items[i] = {
          ...this.items[i],
          ...data,
          updatedAt: Date.now(),
        };
        return this.items[i];
      }
    }
    throw new Error('No item');
  }

  async remove(params: HelloWorld.EntityKey): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === params.id) {
        this.items.splice(i, 1);
        return;
      }
    }
    throw new Error('No item');
  }

  async findOne(params: HelloWorld.EntityKey): Promise<HelloWorld.Entity> {
    const item = await this.items.find((item) => item.id === params.id);
    if (item) {
      return item;
    }
    throw new Error('No item');
  }

  async findAll(query?: CrudListQuery<HelloWorld.EntityOrderField, HelloWorld.EntityFilter>):
    Promise<CrudListResult<HelloWorld.ListedEntity>> {
    const {
      limit = 10,
      offset = 0,
      order = { field: 'id', direction: 'asc' },
      filter,
    } = query || {};
    const list = this.items
      .filter((item) => {
        console.log('filter >>>', filter);
        if (filter?.amount) {
          if (typeof filter.amount === 'number') {
            return item.amount === filter.amount;
          } else if (typeof filter.amount === 'object') {
            const { lt, gt } = filter.amount as any;
            if (lt) {
              return item.amount < lt;
            }
            if (gt) {
              return item.amount > gt;
            }
          }
          return false;
        }
        return true;
      })
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

  async doBarrelRoll(data: HelloWorld.UpdateEntity, params: HelloWorld.EntityKey): Promise<HelloWorld.Entity> {
    console.log('doBarrelRoll.request >>>', data, params);
    return this.items[0];
  }

  async superCreate(data: HelloWorld.CreateEntity): Promise<HelloWorld.Entity> {
    return this.create(data);
  }
}
