import { ApiParams } from '~/1st-api';
import { BaseController } from '../controllers';

export type ControllerMethod = (params: ApiParams) => Promise<any>;

export function createControllerMethod(Controller: new () => BaseController, method: string): ControllerMethod {
  return async (params: ApiParams) => {
    const controller = new Controller();

    if (controller.beforeAction) {
      await controller.beforeAction(params, method);
    }

    return controller[method](params);
  };
}
