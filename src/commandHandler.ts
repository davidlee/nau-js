import { uid } from './uid.js' 
import { Entry } from './entities/Entry.js'
import { ParsedCommandArgs } from './parser.js'
import { EntryTypes, StatusNames } from './entry.js'

import eventChannel from './eventChannel.js'

import { 
  EntityManager,
  EntityRepository,
  MikroORM,
  JsonType,
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
  entries: Entry[]

  constructor(orm: MikroORM) {
    this.orm  = orm
    this.em   = orm.em 
    this.repo = this.em.getRepository<Entry>('Entry')
    this.entries = []

    eventChannel.on('command:add', (args: Args) => {
      this.add(args)
    })

    eventChannel.on('command:list', (args: Args) => {
     this.list(args)
    })
  }

  @UseRequestContext()
  async add(args: Args): Promise<void> {
    const entry: Entry = this.repo.create({
      text:    args.modifiers.words.join(' '), 
      urgency: 1.0,
      type:    EntryTypes.Transient,
      status:  StatusNames.Draft,
      path:    '/',
      created: new Date(),
      meta:    new JsonType(),
      uid:     uid(),
    }) 
    await this.em.persistAndFlush(entry)
    eventChannel.emit('created', { status: 'OK', id: entry.id, record: entry })
  }

  @UseRequestContext()
  async list(args: Args) {
    console.log("== LIST ==")
    // TODO args -> conditions
    const entries = await this.repo.findAll() // TODO filters
    eventChannel.emit('entries', entries)
    this.entries = entries
  }

  modify(args: Args) {
    args
  }

  remove(args: Args) {
    args
  }
  
  context(args: Args) {
    args
  }

  done(args: Args) {
    args    
   }

  config(args: Args) {
    args    
  }

  undo(args: Args) {
    args    
  }

  async exit(ms:number = 250){
    setTimeout(async () => await this.orm.close(true), ms)
  }

  protected processArgs(args: Args) {
    const fs: object = {}
    const ms = args.modifiers
    
    if(ms.words.length !== 0 ) { Object.assign(fs, {text: ms.words.join(' ')} ) }  
    return fs
  }
  
}

