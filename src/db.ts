import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js'
// import { BetterSqliteDriver } from '@mikro-orm/better-sqlite';

// type ORM = MikroORM<IDatabaseDriver<Connection>>
export const orm: MikroORM<IDatabaseDriver<Connection>> = await MikroORM.init(config)

export default orm

