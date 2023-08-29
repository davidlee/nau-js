import { ParsedCommand} from './parser'
import camelCase from 'camelcase'
import { CommandHandler } from './commandHandler'

// type Args = ParsedCommandArgs

// export type CommandHandler = {
//   add:       Function
//   remove:    Function
//   list:      Function
//   modify:    Function
//   configure: Function
// }

export class Dispatcher {
  commandHandler: CommandHandler
  issueCommand: Function

  constructor(ch: CommandHandler) {
    this.commandHandler = ch
    this.issueCommand = function (cmd: ParsedCommand) {
      dispatch(cmd, this.commandHandler)
    }
  }
}

function dispatch(cmd: ParsedCommand, ch: CommandHandler) {
  logCommandReceived(cmd)

  // const { command, ...args } = cmd // args =
  const fn = camelCase(cmd.command.join('-'))
  ch[fn as keyof CommandHandler](cmd)
}

function logCommandReceived(cmd: ParsedCommand) {
  console.log('dispatcher >>', cmd)
}
