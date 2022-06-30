import { ApiParams } from '~/1st-api';

export abstract class BaseController {
  async beforeAction(params: ApiParams, method: string): Promise<void> {}
}
