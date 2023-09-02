import * as R from './entryRepository.js'
import { Entry } from './entities/Entry.js'
import { ParsedCommandArgs } from './parser.js'

type Args = ParsedCommandArgs

export class CommandHandler {

  constructor(){
  }

  add(args: Args) {
    // const e: Entry = buildEntry(this.processArgs(args))
    // TODO append fields that require read repository access
    // console.log(e)
    // write
  }

  list(args: Args) {
    // console.log("== LIST ==")
    // console.log(entries, entries)
  }

  protected processArgs(args: Args) {
    const fs: object = {}
    const ms = args.modifiers
    
    if(ms.words.length !== 0 ) { Object.assign(fs, {text: ms.words.join(' ')} ) }  
    return fs
  }
  
}

