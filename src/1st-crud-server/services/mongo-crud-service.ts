import mongoose from 'mongoose';
import { CrudService, CrudServiceListQuery, CrudServiceListResult } from '~/1st-crud';

export abstract class MongoCrudService<MODEL_TYPE> extends CrudService<MODEL_TYPE> {
  protected model: mongoose.Model<MODEL_TYPE>;

  protected createdAtField: string = 'createdAt';

  protected updatedAtField: string = 'updatedAt';

  async create(partialFields: Partial<MODEL_TYPE>): Promise<MODEL_TYPE> {
    const overFields = {};
    if (this.createdAtField) {
      overFields[this.createdAtField] = new Date();
    }
    if (this.updatedAtField) {
      overFields[this.updatedAtField] = new Date();
    }
    const model = new this.model({
      ...partialFields,
      ...overFields,
    });
    await model.save();
    return model;
  }

  async update(partialData: Partial<MODEL_TYPE>, id: string): Promise<MODEL_TYPE> {
    const overFields = {};
    if (this.updatedAtField) {
      overFields[this.updatedAtField] = new Date();
    }
    await this.model.updateOne({ '_id': id }, {
      ...partialData,
      ...overFields,
    });
    return this.get(id);
  }

  async get(id: string): Promise<MODEL_TYPE> {
    return this.model
      .findOne()
      .where('_id', id);
  }

  async list(query: CrudServiceListQuery): Promise<CrudServiceListResult<MODEL_TYPE>> {
    const total = await this.model.count();
    const list = await this.model
      .find()
      .skip(query.skip ?? 0)
      .limit(query.limit ?? 10);
    return {
      list,
      total,
    };
  }

  async delete(id: string): Promise<void> {
    await this.model
      .deleteOne()
      .where('_id', id);
  }
}
