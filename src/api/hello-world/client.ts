import TPCore from '~/2p-core';
import * as Config from './config';

export const client: Config.Service = {
  create: TPCore.api.createRequest(TPCore.crud.requestConfig.create, Config.service.properties.create),
  update: TPCore.api.createRequest(TPCore.crud.requestConfig.update, Config.service.properties.update),
  remove: TPCore.api.createRequest(TPCore.crud.requestConfig.remove, Config.service.properties.remove),
  findOne: TPCore.api.createRequest(TPCore.crud.requestConfig.findOne, Config.service.properties.findOne),
  findAll: TPCore.api.createRequest(TPCore.crud.requestConfig.findAll, Config.service.properties.findAll),
  doBarrelRoll: TPCore.api.createRequest(Config.requestConfig.doBarrelRoll, Config.service.properties.doBarrelRoll),
};
