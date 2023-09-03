import config from './mikro-orm.config.js'
import { uid } from './uid.js' 
import { Entry } from './entities/Entry.js'
import { ParsedCommandArgs } from './parser.js'
import { EntryTypes, StatusNames } from './entry.js'
import { getEm, forkEm, getOrm } from './db.js'

import { 
  Connection, 
  EntityManager,
  EntityRepository,
  IDatabaseDriver,
  MikroORM,
  JsonType,
  RequestContext,
  UseRequestContext,
} from '@mikro-orm/core'

export enum CommandName {
  add     = 'add',
  modify  = 'modify',
  list    = 'list',
  context = 'context',
  done    = 'done',
  config  = 'config',
  remove  = 'remove',
  undo    = 'undo',
}


type Args = ParsedCommandArgs

export class CommandHandler {

  orm:  MikroORM
  em:   EntityManager
  repo: EntityRepository<Entry>

  constructor(orm: MikroORM = getOrm()) {
    this.orm  = orm
    this.em   = orm.em 
    this.repo = this.em.getRepository<Entry>('Entry')
  }

  @UseRequestContext()
  async add(args: Args) {
    const entry: Entry = this.repo.create({
      text: args.modifiers.words.join(' '), 
      urgency: 1.0,
      type: EntryTypes.Transient,
      status: StatusNames.Draft,
      path: '/',
      created: new Date(),
      meta: new JsonType(),
      uid: uid(),
      
    }) 
    const result = this.em.persistAndFlush(entry)
    await result
  }

  @UseRequestContext()
  async list(args: Args) {
    console.log("== LIST ==")
    const entries = await this.repo.findAll() // TODO filters
    entries.forEach((v,_) => {
      console.log(v)
    })
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

  undo(args: Args) {
    
  }

  async exit(){
    setTimeout(async () => await this.orm.close(true), 250)
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

