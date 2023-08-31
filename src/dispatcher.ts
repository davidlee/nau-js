import { ParsedCommand} from './parser.js'
import { CommandHandler } from './commandHandler.js'
import camelCase from 'camelcase'

export class Dispatcher {
  commandHandler: CommandHandler

  constructor(handler: CommandHandler) {
    this.commandHandler = handler
  }
  
  dispatchCommand(cmd: ParsedCommand) {
    this.logCommandReceived(cmd)

    const methodName = camelCase(cmd.command.join('')) as keyof CommandHandler
    return this.commandHandler[methodName](cmd)
  }

  logCommandReceived(cmd: ParsedCommand): void {
    console.log('dispatcher >>', cmd)
  }
}

