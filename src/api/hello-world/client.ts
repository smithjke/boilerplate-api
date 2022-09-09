import axios from 'axios';
import * as HelloWorld from './entity';

export class Client implements HelloWorld.EntityCrudService {
  private baseUrl = '/api/hello-world';

  create(createData: HelloWorld.CreateEntity): Promise<HelloWorld.Entity> {
    return axios.request({
      method: 'POST',
      url: '',
      baseURL: this.baseUrl,
      data: createData,
    })
  }

  update(id: HelloWorld.Entity['id'], updateData: HelloWorld.UpdateEntity): Promise<HelloWorld.Entity> {
    return axios.request({
      method: 'PUT',
      url: `/${id}`,
      baseURL: this.baseUrl,
      data: updateData,
    })
  }

  remove(id: HelloWorld.Entity['id']): Promise<void> {
    return axios.request({
      method: 'DELETE',
      url: `/${id}`,
      baseURL: this.baseUrl,
    })
  }

  findOne(id: HelloWorld.Entity['id']): Promise<HelloWorld.Entity> {
    return axios.request({
      method: 'GET',
      url: `/${id}`,
      baseURL: this.baseUrl,
    })
  }

  findAll(query: HelloWorld.EntityCrudFindAllQuery): Promise<HelloWorld.EntityCrudFindAllResult> {
    return axios.request({
      method: 'GET',
      url: '',
      baseURL: this.baseUrl,
    })
  }
}
