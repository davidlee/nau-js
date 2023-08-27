import { argsFromArgv, parseCommand, Command } from './parser'

console.log(process.argv)

const input = argsFromArgv(process.argv)
console.log(input)
const command = parseCommand(input)

console.log(command)

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allEntries = await prisma.entry.findMany()
  console.log(allEntries)
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

// import { e } from './entry'
// console.log(e.text)