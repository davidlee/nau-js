import * as R from './entryRepository'
import { Entry } from './entry'
import { ParsedCommandArgs } from './parser'
import { Value } from '@sinclair/typebox/value'
import { uid } from './uid'

type Args = ParsedCommandArgs

export class CommandHandler {
  private reader: R.EntryReader
  private writer: R.EntryWriter

  constructor(read: R.EntryReader, write: R.EntryWriter) {
    this.reader = read
    this.writer = write
  }

  add(args: Args) {
    // console.log('called handler.#add', args)
    const e: Entry = new EntryBuilder().build(args, this.reader)
    return this.writer.create(e)
  }

  list(args: Args) {
    console.log("== LIST ==")
    return this.reader
  }
}

// ...
class EntryBuilder {
  static schema = Entry
  
  build(args: Args, reader: R.EntryReader): Entry {
    const props = { 
      id:   this.nextID(), 
      uid:  this.generateUID(), 
      path: this.generatePath(args),
      text: this.text(args),
      created: new Date(),
    }
    const entry: Entry = { ...Value.Create(Entry), ...props }
    
    console.log("ENTRY::: ", entry)
    return entry
  }

  protected text(args: Args): string {
    return args.modifiers.words.join(' ') 
  }

  protected generateUID(): string {
    return uid() 
  }

  protected nextID(): number {
    // this.reader.getMaxID() 
    return 1 
  }
  
  protected generatePath(args: Args): string {
    // this.reader.getPath( ... )
    return '/' 
  }
}
