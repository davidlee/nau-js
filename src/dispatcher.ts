import { ParsedCommand} from './parser'
import camelCase from 'camelcase'
import { CommandHandler } from './commandHandler'

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

