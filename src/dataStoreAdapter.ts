import * as E from './entry.js'
import { Value } from '@sinclair/typebox/value'

export abstract class DataStoreAdapter { // need separate read/write abstract classes

  async persistEntry(entry:E.Entry): Promise<void> {
    const str = Value.Encode(E.Entry, entry)
    // return new Promise((resolve, reject) => {
    //   resolve(this.write(JSON.stringify(str)))
    // })
    return this.write(JSON.stringify(str))
  }
  
  protected abstract write(str: string): Promise<void>
}
