import axios from 'axios';
import TPCore from '~/2p-core';
import * as HelloWorld from './entity';

export class Client extends TPCore.api.CrudClient implements HelloWorld.EntityCrudService {
  private baseUrl = '/api/hello-world';

  create(request: { data: HelloWorld.CreateEntity }): Promise<HelloWorld.Entity> {
    return axios.request({
      method: 'POST',
      url: '',
      baseURL: this.baseUrl,
      data: request.data,
    });
  }

  update(request: { params: HelloWorld.EntityFindOne['request']['params'], data: HelloWorld.UpdateEntity }): Promise<HelloWorld.Entity> {
    return axios.request({
      method: 'PUT',
      url: `/${request.params.id}`,
      baseURL: this.baseUrl,
      data: request.data,
    });
  }

  remove(request: { params: HelloWorld.EntityFindOne['request']['params'] }): Promise<void> {
    return axios.request({
      method: 'DELETE',
      url: `/${request.params.id}`,
      baseURL: this.baseUrl,
    });
  }

  findOne(request: { params: HelloWorld.EntityFindOne['request']['params'] }): Promise<HelloWorld.Entity> {
    return axios.request({
      method: 'GET',
      url: `/${request.params.id}`,
      baseURL: this.baseUrl,
    });
  }

  findAll(request: { query: HelloWorld.EntityFindAll['request']['query'] }): Promise<HelloWorld.EntityFindAll['response']> {
    const queryString = TPCore.api.makeQueryString(request.query);
    return axios.request({
      method: 'GET',
      url: `?${queryString}`,
      baseURL: this.baseUrl,
    });
  }

  doBarrelRoll(request: HelloWorld.EntityDoBarrelRoll['request']): Promise<HelloWorld.EntityDoBarrelRoll['response']> {
    return axios.request({
      method: 'PUT',
      url: `/${request.params.id}/do-barrel-roll`,
      baseURL: this.baseUrl,
    });
  }
}
