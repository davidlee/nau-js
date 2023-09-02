import { parseArgs } from './parser.js'
import { dispatch } from './dispatcher.js'

async function main() {
  // ... you will write your Prisma Client queries here
  const command = parseArgs(process.argv)

  const res = dispatch(command)
  console.log(res)
}

main()