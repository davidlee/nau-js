import { ParsedCommand} from './parser.js'
import { CommandHandler } from './commandHandler.js'
import camelCase from 'camelcase'

let commandHandler: CommandHandler

export function setHandler(handler: CommandHandler) {
  commandHandler = handler
}

function logCommandReceived(cmd: ParsedCommand): void {
  console.log('dispatcher >>', cmd)
}

export function dispatch(cmd: ParsedCommand) {
  // logCommandReceived(cmd)

  const methodName = camelCase(cmd.command.join('')) as keyof CommandHandler
  return commandHandler[methodName](cmd)
}


