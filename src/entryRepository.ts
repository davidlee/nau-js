// import {Entry } from './entry.js'
import { DataStoreAdapter } from './dataStoreAdapter.js'

export abstract class EntryRepository {
  adapter: DataStoreAdapter

  constructor(adapter: DataStoreAdapter) {
    this.adapter = adapter
  }
}

export class EntryReader extends EntryRepository {
  find(id:number) {
    
  }

  findByUID(uid: string){
    
  }

  async findAll(): Promise<Entry[]> {
    let entries: Entry[] = []
    await this.adapter.fetchEntries().then((es) => {
      entries = es
    })
    return new Promise((resolve) => [
      resolve(entries)
    ])
  }
}

export class EntryWriter extends EntryRepository {

  create(e: Entry): Promise<void> { // todo return value
    return this.adapter.persistEntry(e)
  }

}
