import { User } from '~/api';
import { UserModel } from '../models';

export class UserService {
  async create(partialUser: Partial<User>): Promise<User> {
    const user = new UserModel({
      ...partialUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await user.save();
    return user;
  }

  async get(query: { id: string; }): Promise<User> {
    const user = await UserModel.findOne({ _id: query.id });
    user['id'] = String(user['_id']);
    return user;
  }

  async list(query: { limit: number; skip: number; }): Promise<{ list: Array<User>; total: number; }> {
    const total = await UserModel.count();
    const list = await UserModel
      .find()
      .skip(query.skip)
      .limit(query.limit);
    return {
      list: list.map((user) => {
        user['id'] = String(user['_id']);
        return user;
      }),
      total,
    };
  }
}
