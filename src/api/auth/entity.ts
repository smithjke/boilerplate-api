import { Static, Type } from '@sinclair/typebox';

export const login = Type.Object({
  login: Type.String(),
  password: Type.String(),
});

export const refresh = Type.Object({
  refreshToken: Type.String(),
})

export const result = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
});

export type Login = Static<typeof login>;
export type Refresh = Static<typeof refresh>;
export type Result = Static<typeof result>;
