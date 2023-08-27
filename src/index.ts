import { argsFromArgv, parseCommand, Command } from './parser'

console.log(process.argv)

const input = argsFromArgv(process.argv)
console.log(input)
const command = parseCommand(input)

console.log(command)


// import { e } from './entry'
// console.log(e.text)