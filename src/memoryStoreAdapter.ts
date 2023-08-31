import { DataStoreAdapter } from './dataStoreAdapter.js'

export class MemoryStoreAdapter extends DataStoreAdapter {
  static data: string = ""

  constructor() {
    super()
  }
  
  async write(str:string): Promise<void> { 
    return new Promise((resolve, _reject)=> {
      resolve(MemoryStoreAdapter.write(str))
    })
  }

  async read(): Promise<string[]> { 
    return new Promise((resolve) => {
      resolve(
        MemoryStoreAdapter.read().split("\n")
      )
    })
  }

  static write(str:string): void {
    MemoryStoreAdapter.data += str
  }

  static read(): string {
    return MemoryStoreAdapter.data
  }
}
