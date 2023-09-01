import * as repl from 'node:repl'
import * as E from './entry.js'
import { Value } from '@sinclair/typebox/value'
import { parse } from './parser.js'
import * as Load from './dataLayerLoader.js'

const replServer = repl.start('> ')

replServer.context.E          = E
replServer.context.Entry      = E.Entry
replServer.context.Value      = Value
replServer.context.dispatcher = Load.dispatcher()
replServer.context.parse      = parse
replServer.context.cmd        = function(cmd: string){
  const c = parse(cmd.split(' '))
  return replServer.context.dispatcher.dispatchCommand(c)
}
