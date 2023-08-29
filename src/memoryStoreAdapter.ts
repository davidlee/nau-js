import { DataStoreAdapter } from './dataStoreAdapter'

export class MemoryStoreAdapter implements DataStoreAdapter {
  path: string

  constructor(path: string) {
    this.path = path
  }
}
