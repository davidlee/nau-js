import * as E from './entry.js'
import { DataStoreAdapter } from './dataStoreAdapter.js'

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
    console.log('create', e)

    const result: boolean = E.Entry.Check(e)
    
    console.log('result:: ', result)
    if(result) {
      this.adapter.persistEntry(e)
    } else {
      console.log('>> RESULT >>', result, e)

      const valErrs = [...E.C.Errors(e)]  
      
      console.log(valErrs)
      // ..
    }
  }

  
  // constructor(adapter: DataStoreAdapter) {
  //   super(adapter)
  // }
}
