import { ParsedCommand, ParsedCommandArgs } from './parser.js'
import eventChannel from './eventChannel.js'

export async function dispatch(cmd: ParsedCommand) {
  const { command, ...args } = cmd
  sinkCommand(command.join(':'), args)
}

function sinkCommand(command: string, args: ParsedCommandArgs) {
   
  eventChannel.once('reply', (event: string, result: object) => {
    if(event === 'reply') {
      console.log("%o", result)
    }
  })

  const event = `command:${command}` 
  console.log('sink: ', command, event, args)
  eventChannel.emit(event, args)
}
