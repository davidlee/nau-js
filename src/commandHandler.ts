import config from './mikro-orm.config.js'
import { uid } from './uid.js' 
import { Entry } from './entities/Entry.js'
import { ParsedCommandArgs } from './parser.js'
import { EntryTypes, StatusNames } from './entry.js'

import { 
  Connection, 
  EntityManager,
  EntityRepository,
  IDatabaseDriver,
  MikroORM,
  JsonType,
} from '@mikro-orm/core'

type Args = ParsedCommandArgs

const orm = await MikroORM.init(config)

export class CommandHandler {

  orm:  MikroORM<IDatabaseDriver<Connection>>
  em:   EntityManager
  repo: EntityRepository<Entry>

  constructor() {
    this.orm  = orm
    this.em   = orm.em.fork()
    this.repo = this.em.getRepository<Entry>('Entry')
  }


  add(args: Args) {
    const entry: Entry = this.repo.create({
      text: args.modifiers.words.join(' '), 
      urgency: 1.0,
      type: EntryTypes.Transient,
      status: StatusNames.Draft,
      path: '/',
      created: new Date(),
      meta: new JsonType(),
      uid: uid(),
      
    }) //new Entry(args.modifiers.words.join(' '))
    const result = this.em.persistAndFlush(entry)
    return result
  }

  list(args: Args) {
    console.log("== LIST ==")
    // console.log(entries, entries)
  }

  modify(args: Args) {
    
  }

  remove(args: Args) {
    
  }
  
  context(args: Args) {
    
  }

  done(args: Args) {
    
  }

  config(args: Args) {
    
  }

  // protected buildEntry(attrs: object) (
  //   const entry = new Entry()
  // )

  protected processArgs(args: Args) {
    const fs: object = {}
    const ms = args.modifiers
    
    if(ms.words.length !== 0 ) { Object.assign(fs, {text: ms.words.join(' ')} ) }  
    return fs
  }
  
}

