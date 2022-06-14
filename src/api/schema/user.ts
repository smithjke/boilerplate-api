export type User = {
  id: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRaw = {
  id: string;
  name: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export function mapUser(data: Partial<User>): Partial<UserRaw> {
  return {
    id: data.id,
    name: data.name,
    password: data.password,
    created_at: data.createdAt && data.createdAt.toISOString(),
    updated_at: data.updatedAt && data.updatedAt.toISOString(),
  };
}

export function mapUserRaw(dataRaw: Partial<UserRaw>): Partial<User> {
  return {
    id: dataRaw.id ? String(dataRaw.id) : null,
    name: dataRaw.name ? String(dataRaw.name) : null,
    password: dataRaw.password ? String(dataRaw.password) : null,
    createdAt: dataRaw.created_at ? new Date(dataRaw.created_at) : null,
    updatedAt: dataRaw.updated_at ? new Date(dataRaw.updated_at) : null,
  };
}
