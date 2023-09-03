// import { Effect, Console } from "effect"
import { orm, close } from './db.js'
import { parseArgs } from './parser.js'
import { dispatch } from './dispatcher.js'
import { CommandHandler } from "./commandHandler.js"
// import { Entry } from './entities/Entry.js'
// import eventChannel from './eventChannel.js'


// we want this guy listening
new CommandHandler(orm)

async function main() {
  const command = parseArgs(process.argv)
  
  dispatch(command).then((result) => {
    console.log('command success')
  }).catch((reason) => {
      console.log('index bad', reason)})
  
 close()
}

main()