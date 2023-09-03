import { 
  MikroORM, 
  ForkOptions
} from '@mikro-orm/core';
import config from './mikro-orm.config.js'

export const orm = await MikroORM.init(config)

export function getOrm() {
  return orm
}
export function getEm() {
  return orm.em
}

export function forkEm(o: ForkOptions) {
  return orm.em.fork(o)
}

export function close(ms:number = 250) {
  setTimeout( async () => await orm.close(true), ms)
}
