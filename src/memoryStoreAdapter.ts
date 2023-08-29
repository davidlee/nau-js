import { DataStoreAdapter } from './dataStoreAdapter'

export class MemoryStoreAdapter extends DataStoreAdapter {
  static data: string = ""

  constructor() {
    super()
    // MemoryStoreAdapter.data ||= ""
  }
  
  protected write(str:string) { MemoryStoreAdapter.write(str) }
  protected read(){ return MemoryStoreAdapter.read }

  static write(str:string) {
    MemoryStoreAdapter.data += str
  }

  static read() {
    return MemoryStoreAdapter.data
  }
}
