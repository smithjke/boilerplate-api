export abstract class BaseClient {
  protected abstract call(address: string, params: object): Promise<object>;
}
