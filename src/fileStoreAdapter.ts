// import * as fs from 'node:fs'
import * as fs from 'node:fs/promises'
import * as p from 'node:path'

import { DataStoreAdapter } from './dataStoreAdapter.js'

export class FileStoreAdapter extends DataStoreAdapter {
  path: string

  constructor(path: string) {
    super()
    this.path = path

    this.ensureDirExists()
  }

  async ensureDirExists() {
    const dir = await fs.mkdir(p.dirname(this.path), { recursive: true }).
      catch((err) => console.log("ERR:", err))
    
    if(dir)
      console.log('data directory created:', dir)
  }

  async write(str: string): Promise<void> {
    
    let filehandle: fs.FileHandle | undefined
    try {
      filehandle = await fs.open(this.path, 'a')
      return fs.appendFile(filehandle as fs.FileHandle, str) 
    // } catch {
    } finally {
      if (filehandle !== undefined)
        await filehandle.close()
    }
  }
  
}
