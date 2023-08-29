import { ParsedCommand } from './parser'
import camelCase from 'camelcase'

export type CommandHandlers = {
  add: Function
  remove: Function
  list: Function
  modify: Function
  configure: Function
}

export class Dispatcher {
  commandHandlers: CommandHandlers
  issueCommand: Function

  constructor(ch: CommandHandlers) {
    this.commandHandlers = ch
    this.issueCommand = function (cmd: ParsedCommand) {
      dispatch(cmd, this.commandHandlers)
    }
  }
}

function dispatch(cmd: ParsedCommand, ch: CommandHandlers) {
  logCommandReceived(cmd)

  const { command, ...args } = cmd // args =
  const fn = camelCase(cmd.command.join('-'))
  ch[fn as keyof CommandHandlers](args)
}

function logCommandReceived(cmd: ParsedCommand) {
  console.log('dispatcher >>', cmd)
}
