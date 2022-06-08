import mongoose from 'mongoose';

export abstract class MongoCrudService<MODEL_TYPE> {
  protected model: mongoose.Model<MODEL_TYPE>;

  protected createdAtField: string = 'createdAt';

  protected updatedAtField: string = 'updatedAt';

  async create(partialSession: Partial<MODEL_TYPE>): Promise<MODEL_TYPE> {
    const overFields = {};
    if (this.createdAtField) {
      overFields[this.createdAtField] = new Date();
    }
    if (this.updatedAtField) {
      overFields[this.updatedAtField] = new Date();
    }
    const model = new this.model({
      ...partialSession,
      ...overFields,
    });
    await model.save();
    return model;
  }

  async get(id: string): Promise<MODEL_TYPE> {
    return this.model
      .findOne()
      .where('_id', id);
  }

  async list(query: { limit: number; skip: number; }): Promise<{ list: Array<MODEL_TYPE>; total: number; }> {
    const total = await this.model.count();
    const list = await this.model
      .find()
      .skip(query.skip)
      .limit(query.limit);
    return {
      list,
      total,
    };
  }
}
