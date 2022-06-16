import { StorageRepository } from './storage-repository';

export class LocalStorageRepository implements StorageRepository {
  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
