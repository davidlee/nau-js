import { argsFromArgv, parseCommand, Command } from './parser'

console.log(process.argv)

const input = argsFromArgv(process.argv)
const command = parseCommand(input)

console.log(command)
