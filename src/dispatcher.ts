import { ParsedCommand } from './parser.js'
import { CommandHandler } from './commandHandler.js'
import camelCase from 'camelcase'

let commandHandler: CommandHandler = new CommandHandler()

export function dispatch(cmd: ParsedCommand) {
  const methodName = camelCase(cmd.command.join('')) 
  switch(methodName) {
    case 'add':
    case 'list':    
      return commandHandler[methodName](cmd)
    default:
      console.log('missing handler >', cmd)
  }
}

function logCommandReceived(cmd: ParsedCommand): void {
  console.log('dispatcher >>', cmd)
}


