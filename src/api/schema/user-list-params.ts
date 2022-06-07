import { ApiListParams } from '~/1st-api';

export type UserListParams = ApiListParams;

export type UserListParamsRaw = ApiListParams;

export function mapUserListParams(data: UserListParams): UserListParamsRaw {
  return data;
}

export function mapUserListParamsRaw(dataRaw: UserListParamsRaw): UserListParams {
  return dataRaw;
}
