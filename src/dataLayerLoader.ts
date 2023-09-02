import { setHandler, dispatch } from './dispatcher.js'
import { CommandHandler } from './commandHandler.js'

interface Configuration { }

export function dispatcher(options: Configuration = {}): Function {
  const handler = new CommandHandler()
  setHandler(handler)
  return dispatch
}
