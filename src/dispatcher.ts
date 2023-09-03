import { ParsedCommand } from './parser.js'
import { CommandHandler, CommandName } from './commandHandler.js'
// import camelCase from 'camelcase'

let handler: CommandHandler = new CommandHandler()

export async function dispatch(cmd: ParsedCommand) {
  function exit() {
    handler.exit()  
  }
  const { command, ...args } = cmd
  log(cmd)
  if(command.length === 1){
    return await handler[command[0]](args)
  } else {
    throw new Error("subcommands not implemented")
  }
}

function log(cmd: ParsedCommand): void {
  console.log('dispatcher >>', cmd)
}

export function exit(){
  handler.exit() 
}

