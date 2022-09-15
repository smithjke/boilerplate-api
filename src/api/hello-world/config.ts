import { Static, Type } from '@sinclair/typebox';
import TPCore from '~/2p-core';
import {
  createEntity,
  entity,
  entityFilter,
  entityKey,
  entityOrderField,
  listedEntity,
  updateEntity,
} from './entity';

export enum EntityMethod {
  DO_BARREL_ROLL = 'doBarrelRoll',
}

// DO BARREL ROLL

export const doBarrelRollRequest = Type.Object({
  params: entityKey,
  data: updateEntity,
});

export const doBarrelRollResponse = Type.Object({
  data: Type.String(),
});

export const doBarrelRoll = TPCore.crud.Method(doBarrelRollRequest, doBarrelRollResponse);

export type DoBarrelRollRequest = Static<typeof doBarrelRollRequest>;

export type DoBarrelRollResponse = Static<typeof doBarrelRollResponse>;

// ENTITY

export const methods = Type.Object({
  doBarrelRoll: TPCore.crud.Method(doBarrelRollRequest, doBarrelRollResponse),
});

export const requestConfig: Record<EntityMethod, TPCore.api.RequestConfig> = {
  [EntityMethod.DO_BARREL_ROLL]: {
    method: 'PUT',
    url: '/:id/do-barrel-roll',
  },
};

// CRUD

export const crud = TPCore.crud.Crud({
  entity,
  createEntity,
  updateEntity,
  listedEntity,
  entityKey,
  entityOrderField,
  entityFilter,
});

export type Crud = Static<typeof crud>;

// SERVICE

export const service = Type.Intersect([
  crud,
  methods,
]);

export type Service = Static<typeof service>;

// TEST


