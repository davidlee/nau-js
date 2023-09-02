import * as repl from 'node:repl'
// 
import * as E from './entry.js'
import { Entry } from './entities/Entry.js'
import { CommandHandler } from './commandHandler.js'
import { parse } from './parser.js'
// 

const replServer = repl.start('> ')

replServer.context.E          = E
replServer.context.Entry      = Entry
replServer.context.parse      = parse
replServer.context.ch         = new CommandHandler()
replServer.context.cmd        = function(cmd: string){
  const c = parse(cmd.split(' '))
  return replServer.context.dispatcher.dispatchCommand(c)
}
