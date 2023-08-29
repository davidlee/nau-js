import * as E from './entry'
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

  create(e: E.Entry): void { // todo return value
    const result = E.Entry.Check(e)
    if(result) {
      this.adapter.persistEntry(e)
    } else {
      console.log('>> RESULT >>', result, e)
      // ..
    }
  }

  
  // constructor(adapter: DataStoreAdapter) {
  //   super(adapter)
  // }
}
