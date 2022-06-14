import { BaseController } from '../controllers';

export type ControllerMethod = (params: any) => Promise<any>;

export function createControllerMethod(controller: BaseController, method: string): ControllerMethod {
  return async (params: any) => {
    return controller[method](params);
  };
}
