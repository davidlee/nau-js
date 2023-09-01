import { parseArgs, parse } from './parser.js'
import * as Load from './dataLayerLoader.js'
import { prisma, bark } from './client.js'


async function main() {
  // ... you will write your Prisma Client queries here
  const command = parseArgs(process.argv)
  const dispatcher = Load.dispatcher()

  const res = dispatcher.dispatchCommand(command)
  console.log(res)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
