import mongoose from 'mongoose';
import { ApiListQuery, ApiListResult } from '~/1st-api';
import { CrudService } from '~/1st-crud';

export abstract class MongoCrudService<MODEL_TYPE> implements CrudService<MODEL_TYPE> {
  protected model: mongoose.Model<MODEL_TYPE>;

  protected createdAtField: string = 'createdAt';

  protected updatedAtField: string = 'updatedAt';

  protected defaultSort: ApiListQuery['sort'] = 'updatedAt';

  protected defaultDirection: ApiListQuery['direction'] = 'desc';

  protected defaultLimit: ApiListQuery['limit'] = 10;

  protected defaultSkip: ApiListQuery['skip'] = 0;

  async create(partialFields: MODEL_TYPE): Promise<MODEL_TYPE> {
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

  async update(partialData: MODEL_TYPE, id: string): Promise<MODEL_TYPE> {
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

  async list(query: ApiListQuery): Promise<ApiListResult<MODEL_TYPE>> {
    const total = await this.model.count();
    const select = this.model.find();
    select.sort({ [query.sort || this.defaultSort]: (query.direction || this.defaultDirection) === 'asc' ? 1 : -1 });
    select.skip(query.skip ?? this.defaultSkip);
    select.limit(query.limit ?? this.defaultLimit);
    const list = await select;
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
