import * as E from './entry'
import { Value } from '@sinclair/typebox/value'

export abstract class DataStoreAdapter { // need separate read/write abstract classes
  persistEntry(entry:E.Entry): boolean {

    const str = Value.Encode(E.Entry, entry)
    console.log(str)
    this.write(JSON.stringify(str))
    return true
  }
  
  protected abstract write(str: string): void
}
