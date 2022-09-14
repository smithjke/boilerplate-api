import axios from 'axios';
import TPCore from '~/2p-core';
import * as HelloWorld from './entity';

export class KekClient extends TPCore.api.CrudClient implements HelloWorld.Service {
  private baseUrl = '/api/hello-world';

  // create(request: { data: HelloWorld.CreateEntity }): Promise<HelloWorld.Entity> {
  //   return axios.request({
  //     method: 'POST',
  //     url: '',
  //     baseURL: this.baseUrl,
  //     data: request.data,
  //   });
  // }
  //
  // update(request: { params: HelloWorld.FindOne['request']['params'], data: HelloWorld.UpdateEntity }): Promise<HelloWorld.Entity> {
  //   return axios.request({
  //     method: 'PUT',
  //     url: `/${request.params.id}`,
  //     baseURL: this.baseUrl,
  //     data: request.data,
  //   });
  // }
  //
  // remove(request: { params: HelloWorld.FindOne['request']['params'] }): Promise<void> {
  //   return axios.request({
  //     method: 'DELETE',
  //     url: `/${request.params.id}`,
  //     baseURL: this.baseUrl,
  //   });
  // }
  //
  // findOne(request: { params: HelloWorld.FindOne['request']['params'] }): Promise<HelloWorld.Entity> {
  //   return axios.request({
  //     method: 'GET',
  //     url: `/${request.params.id}`,
  //     baseURL: this.baseUrl,
  //   });
  // }
  //
  // findAll(request: { query: HelloWorld.FindAll['request']['query'] }): Promise<HelloWorld.FindAll['response']> {
  //   const queryString = TPCore.api.makeQueryString(request.query);
  //   return axios.request({
  //     method: 'GET',
  //     url: `?${queryString}`,
  //     baseURL: this.baseUrl,
  //   });
  // }

  doBarrelRoll(request: HelloWorld.DoBarrelRollRequest): Promise<HelloWorld.DoBarrelRollResponse> {
    return axios.request({
      method: 'PUT',
      url: `/${request.params.id}/do-barrel-roll`,
      baseURL: this.baseUrl,
    });
  }
}

// const crudClient = TPCore.api.createCrudClient(HelloWorld.crud);

const c: HelloWorld.Service = {
  create: async (a) => {
    return {
      id: 'kek',
      title: 'aaa',
      amount: 5,
      createdAt: 1,
      updatedAt: 1,
    };
  },
  update: async (a) => {
    return {
      id: 'kek',
      title: 'aaa',
      amount: 5,
      createdAt: 1,
      updatedAt: 1,
    };
  },
  remove: async (a) => {
    return void 0;
  },
  findOne: async (a) => {
    return {
      id: 'kek',
      title: 'aaa',
      amount: 5,
      createdAt: 1,
      updatedAt: 1,
    };
  },
  findAll: async (a) => {
    return {
      list: [
        {
          id: 'kek',
          title: 'aaa',
          amount: 5,
          createdAt: 1,
          updatedAt: 1,
        }
      ],
      total: 1,
    };
  },
  doBarrelRoll: async (a) => {
    return {
      data: 'a',
    };
  },
};
