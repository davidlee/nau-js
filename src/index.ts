import { parseArgs } from './parser.js'
import { dispatch, exit } from './dispatcher.js'
import {render, Text} from 'ink'

async function main() {
  // @UseRequestContext()
  const command = parseArgs(process.argv)
  const res = dispatch(command)
  console.log(res)
  exit()
}

main()