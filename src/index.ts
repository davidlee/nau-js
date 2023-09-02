// import orm from './db.js'

import { parseArgs } from './parser.js'
import * as Load from './dataLayerLoader.js'

async function main() {
  // ... you will write your Prisma Client queries here
  const command = parseArgs(process.argv)
  const dispatcher = Load.dispatcher()

  const res = dispatcher(command)
  console.log(res)
}

main()