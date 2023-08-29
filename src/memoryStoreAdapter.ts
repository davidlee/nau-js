import { DataStoreAdapter } from './dataStoreAdapter'
import * as E from './entry'

export class MemoryStoreAdapter implements DataStoreAdapter {
  path: string

  constructor(path: string) {
    this.path = path
  }
}
