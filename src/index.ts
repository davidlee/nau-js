import { orm, close } from './db.js'
import { parseArgs } from './parser.js'
import { dispatch } from './dispatcher.js'
import { CommandHandler } from "./commandHandler.js"
import Screen from './main.js'
import { render } from 'ink'


// we want this guy listening
new CommandHandler(orm)

async function main() {
  const command = parseArgs(process.argv)
  
  dispatch(command).then((result) => {
    console.log('command success')
  }).catch((reason) => {
      console.log('index bad', reason)})
  
 // close()
}

render(Screen({log: 'spinner'}))
main()