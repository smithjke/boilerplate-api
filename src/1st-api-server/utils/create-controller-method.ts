import { BaseController } from '../controllers';

export type ControllerMethod = (params: any) => Promise<any>;

export function createControllerMethod(Controller: new () => BaseController, method: string): ControllerMethod {
  return async (params: any) => {
    return (new Controller)[method](params);
  };
}
