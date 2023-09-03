import { Connection, EntityManager, EntityRepository, IDatabaseDriver, MikroORM } from '@mikro-orm/core'
import config from './mikro-orm.config.js'
import { Entry } from './entities/Entry.js'

const orm = await MikroORM.init(config)

export class EntryRepository {

  orm:  MikroORM<IDatabaseDriver<Connection>>
  em:   EntityManager
  repo: EntityRepository<Entry>

  constructor() {
    this.orm  = orm
    this.em   = orm.em
    this.repo = this.em.getRepository<Entry>('Entry')
  }
  
  find(where: object = {}, options: object = {}) {
    return this.em.find(Entry, where, options)
  }
}

