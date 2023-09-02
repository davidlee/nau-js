import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js'

const orm = await MikroORM.init(config)

export default orm

