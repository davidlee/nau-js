import * as R from './entryRepository'
import { Entry } from './entry'
import { ParsedCommandArgs } from './parser'
import { randomUUID } from 'crypto'
// import { Value } from '@sinclair/typebox/value'

type Args = ParsedCommandArgs

export class CommandHandler {
  private reader: R.EntryReader
  private writer: R.EntryWriter


  constructor(read: R.EntryReader, write: R.EntryWriter) {
    this.reader = read
    this.writer = write
  }

  add(args: Args) {
    console.log('called handler.#add', args)
    let e: Entry = new EntryBuilder().build(args)
    this.writer.create(e)
  }
}



class EntryBuilder {
  // args:  Args

  static schema = Entry
  
  // constructor(args: Args) {
    // this.args  = args
  // }

  build(args: Args): Entry {
    const defaults = { ...this.generateID(), ...this.generateUID(), ...this.generatePath() }
    const props    = { text: args.modifiers.words.join(' ') }
    const entry: Entry = { ...Entry.Create(Entry), ...defaults, ...props }
    
    // console.log(this.entry)
       
    // should this go in the repo? yes

    // console.log('>> RESULT >>', result, this.entry)
    return entry
  }

  generateUID() {
    return { uid: randomUUID().slice(0,8) }
  }

  generateID() {
    return { id: 1 }
  }
  
  generatePath() {
    return { path: '/' }
  }

  // tags
  // priority
  
}
