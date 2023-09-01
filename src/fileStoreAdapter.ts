// import * as fs from 'node:fs'
import {open, appendFile, FileHandle, mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'

import { DataStoreAdapter } from './dataStoreAdapter.js'

export class FileStoreAdapter extends DataStoreAdapter {
  path: string

  constructor(path: string) {
    super()
    this.path = path

    this.ensureDirExists()
  }

  async ensureDirExists() {
    const dir = await mkdir(dirname(this.path), { recursive: true }).
      catch((err) => console.log("ERR:", err))
    
    if(dir)
      console.log('data directory created:', dir)
  }

  async write(str: string): Promise<void> {
    let filehandle: FileHandle | undefined
    try {
      filehandle = await open(this.path, 'a')
      return appendFile(filehandle , str + "\n") 
    // } catch {
    } finally {
      if (filehandle !== undefined)
        await filehandle.close()
    }
  }

  async read(): Promise<string[]> {
    let filehandle: FileHandle | undefined
    const records: string[] = []

    try {
      filehandle = await open(this.path, 'r')
      for await (const line of filehandle.readLines()) {
        records.push(line)
      }
      return new Promise((resolve) => {
        resolve(records)
      })
    // } catch {
    } finally {
      if (filehandle !== undefined)
        await filehandle.close()
    }
  }
  
}
