// import { Effect, Console } from "effect"
import { orm, close } from './db.js'
import { parseArgs } from './parser.js'
import { dispatch } from './dispatcher.js'
import { CommandHandler } from "./commandHandler.js"
import EventEmitter from 'events'
import { Entry } from './entities/Entry.js'

class EventSlurp extends EventEmitter {}
const e = new EventSlurp()

e.on('entries',(entries: Entry[]) => {
  console.log('index got:', entries)
})

async function main() {
  const ch = new CommandHandler(orm)
  const command = parseArgs(process.argv)
  
 dispatch(command)
  .then((result) => {
    console.log('index good', result)
  }).catch((reason) => {
      console.log('index bad', reason)})
  
//  close()
}

main()