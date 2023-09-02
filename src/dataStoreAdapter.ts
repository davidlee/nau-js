// import { Entrycc C } from './entry.js'

export abstract class DataStoreAdapter { // need separate read/write abstract classes

  async persistEntry(entry:Entry): Promise<void> {
    // const transformed = Value.Encode(Entry, entry)
    // const validationResult = Value.Check(Entry, transformed)
    if (validationResult) {
      return this.write(JSON.stringify(transformed))
    } else {
      // const valErrs: ValueError[] = [...C.Errors(entry)]  
      console.log('ValueError[] === ::', entry, valErrs)
      throw valErrs
    }
  }

  async fetchEntries(): Promise<Entry[]> {
    let entries: Entry[] = []
    
    await this.read()
    .then((lines) => {
      entries = lines.map((line) => {
        // return Value.Decode(Entry, JSON.parse(line))
      })
    })
    .catch((e) => 
      console.log('failed to read entries!', e))
    
    return new Promise((resolve) => {
      resolve(entries)
    })
  }
  
  protected abstract write(str: string): Promise<void>
  protected abstract read(): Promise<string[]>
}
