import * as R from './entryRepository.js'
import { Entry, EntryFields, buildEntry } from './entry.js'
import { ParsedCommandArgs } from './parser.js'

type Args = ParsedCommandArgs

export class CommandHandler {
  private reader: R.EntryReader
  private writer: R.EntryWriter

  constructor(read: R.EntryReader, write: R.EntryWriter) {
    this.reader = read
    this.writer = write
  }

  add(args: Args) {
    const e: Entry = buildEntry(this.processArgs(args))
    console.log(e)
    return this.writer.create(e)
  }

  list(args: Args) {
    console.log("== LIST ==")
    return this.reader
  }

  protected processArgs(args: Args) {
    let fs: EntryFields = {}
    const ms = args.modifiers
    
    if(ms.words.length !== 0 ) { Object.assign(fs, {text: ms.words.join(' ')} ) }  
    return fs
  }
  
}

