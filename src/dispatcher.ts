import { ParsedCommand } from './parser.js'
import { CommandHandler, CommandName } from './commandHandler.js'
import camelCase from 'camelcase'

let handler: CommandHandler = new CommandHandler()

export async function dispatch(cmd: ParsedCommand) {
  const { command, ...args } = cmd
  log(cmd)
  if(command.length > 1){
    throw new Error("subcommands not implemented")
  } else {
    return await handler[command[0]](args)
  }
}

function log(cmd: ParsedCommand): void {
  console.log('dispatcher >>', cmd)
}


