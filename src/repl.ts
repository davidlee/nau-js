import * as repl from 'node:repl'
// 
import * as E from './entry.js'
import { Entry } from './entities/Entry.js'
import { CommandHandler } from './commandHandler.js'
import { parse } from './parser.js'
import { dispatch} from './dispatcher.js'
import { getOrm, close } from './db.js'
// 

const replServer = repl.start('> ')

replServer.context.E          = E
replServer.context.Entry      = Entry
replServer.context.parse      = parse
replServer.context.orm        = getOrm()
replServer.context.ch         = new CommandHandler(replServer.context.orm)
replServer.context.dispatch   = dispatch
replServer.context.close      = close 
replServer.context.cmd        = function(text: string){
  const c = parse(text.split(' '))
  console.log(c)
  return replServer.context.dispatch(c)
}

