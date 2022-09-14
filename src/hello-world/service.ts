import { HelloWorld } from '~/api';

const currentDate = Date.now();

export class Service implements HelloWorld.Service {
  private items: Array<HelloWorld.Entity> = [
    {
      id: '10',
      title: 'Lol',
      amount: 5,
      createdAt: currentDate - 1000,
      updatedAt: currentDate - 1000,
    },
    {
      id: '11',
      title: 'Kek',
      amount: 3,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  ];

  async create(request: { data: HelloWorld.CreateEntity }): Promise<HelloWorld.Entity> {
    const date = Date.now();
    const item = {
      id: String(Math.round(Math.random() * 1000)),
      ...request.data,
      createdAt: date,
      updatedAt: date,
    };
    this.items.push(item);
    return item;
  }

  async update(request: { params: Parameters<HelloWorld.Crud['findOne']>[0]['params'], data: HelloWorld.UpdateEntity }): Promise<HelloWorld.Entity> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === request.params.id) {
        this.items[i] = {
          ...this.items[i],
          ...request.data,
          updatedAt: Date.now(),
        };
        return this.items[i];
      }
    }
    throw new Error('No item');
  }

  async remove(request: { params: Parameters<HelloWorld.Crud['findOne']>[0]['params'] }): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === request.params.id) {
        this.items.splice(i, 1);
        return;
      }
    }
    throw new Error('No item');
  }

  async findOne(request: { params: Parameters<HelloWorld.Crud['findOne']>[0]['params'] }): Promise<Awaited<ReturnType<HelloWorld.Crud['findOne']>>> {
    const item = await this.items.find((item) => item.id === request.params.id);
    if (item) {
      return item;
    }
    throw new Error('No item');
  }

  async findAll(request: { query: Parameters<HelloWorld.Crud['findAll']>[0]['query'] }): Promise<Awaited<ReturnType<HelloWorld.Crud['findAll']>>> {
    const {
      limit = 10,
      offset = 0,
      order = { field: 'id', direction: 'asc' },
      filter,
    } = request.query;
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

  async doBarrelRoll(request: HelloWorld.DoBarrelRollRequest): Promise<HelloWorld.DoBarrelRollResponse> {
    console.log('doBarrelRoll.request >>>', request);
    return {
      data: `Do Barrel Roll: ${request.params.id}`,
    };
  }
}
