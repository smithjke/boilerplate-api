export type AuthLoginResult = string;

export type AuthLoginResultRaw = string;

export function mapAuthLoginResult(data: AuthLoginResult): AuthLoginResultRaw {
  return String(data);
}

export function mapAuthLoginResultRaw(dataRaw: AuthLoginResultRaw): AuthLoginResult {
  return String(dataRaw);
}
