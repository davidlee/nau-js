import { Entry } from './entry'
import { DataStoreAdapter } from './dataStoreAdapter'

export abstract class EntryRepository {
  adapter: DataStoreAdapter

  constructor(adapter: DataStoreAdapter) {
    this.adapter = adapter
  }
}

export class EntryReader extends EntryRepository {
  // constructor(adapter: DataStoreAdapter) {
  //   super(adapter)
  // }
}

export class EntryWriter extends EntryRepository {
  // constructor(adapter: DataStoreAdapter) {
  //   super(adapter)
  // }
}
