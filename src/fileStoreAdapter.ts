import * as fs from 'node:fs'
import * as p from 'node:path'

import { DataStoreAdapter } from './dataStoreAdapter'

export class FileStoreAdapter extends DataStoreAdapter {
  path: string

  constructor(path: string) {
    super()
    this.path = path
  }

  
  // append to a file, creating the directory if missing
  protected write(str:string): void {
    if(!fs.existsSync(this.path)) this.createDir()
    
    let fd: number
    
    using cleanup = new DisposableStack()
    cleanup.defer(() => {
      if(fd !== undefined)
        fs.closeSync(fd)
    })
    
    fd = fs.openSync(this.path, 'a')
    fs.appendFileSync(fd, str);
  }
  
  protected createDir() {
    fs.mkdirSync(p.dirname(this.path), {recursive: true})
  }

}
