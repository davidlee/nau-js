import * as E from './entry'

export abstract class DataStoreAdapter { // need separate read/write abstract classes
  persistEntry(entry:E.Entry): boolean {
    this.write(JSON.stringify(entry))
    return true
  }
  
  protected abstract write(str: string): void
}
