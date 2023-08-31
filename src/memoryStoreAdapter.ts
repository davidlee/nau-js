import { DataStoreAdapter } from './dataStoreAdapter.js'

export class MemoryStoreAdapter extends DataStoreAdapter {
  static data: string = ""

  constructor() {
    super()
    // MemoryStoreAdapter.data ||= ""
  }
  
  protected write(str:string) { 
    MemoryStoreAdapter.write(str) 
    return true
  }

  read(): object { 
    return JSON.parse( MemoryStoreAdapter.read() )
  }

  static write(str:string) {
    MemoryStoreAdapter.data += str
  }

  static read(): string {
    return MemoryStoreAdapter.data
  }
}
