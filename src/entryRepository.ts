import * as E from './entry.js'
import { DataStoreAdapter } from './dataStoreAdapter.js'
import { Value, ValueError } from '@sinclair/typebox/value'

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

  create(e: E.Entry): Promise<void> { // todo return value
    const result: boolean = Value.Check(E.Entry, e)
    if(!result) {
      const valErrs: ValueError[] = [...E.C.Errors(e)]  
      console.log('ValueError[] === ::', result, e, valErrs)
      throw valErrs
    } 
    return this.adapter.persistEntry(e)
  }

  
  // constructor(adapter: DataStoreAdapter) {
  //   super(adapter)
  // }
}
