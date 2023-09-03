import { ParsedCommand } from './parser.js'
import { CommandHandler, CommandName } from './commandHandler.js'
import { getOrm } from './db.js'

// import camelCase from 'camelcase'

let _handler: CommandHandler 

export async function dispatch(cmd: ParsedCommand) {
  function exit() {
    _handler && _handler.exit()
  }

  const { command, ...args } = cmd
  log(cmd)
  if(command.length === 1){
    return await handler()[command[0]](args)
  } else {
    throw new Error("subcommands not implemented")
  }
}

function log(cmd: ParsedCommand): void {
  console.log('dispatcher >>', cmd)
}

function handler(): CommandHandler {
  if(_handler === undefined)
    _handler = new CommandHandler(getOrm())

  return _handler
}
