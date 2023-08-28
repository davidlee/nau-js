import { argsFromArgv, parse} from './parser'
import * as Loader from './dataLayerLoader'

// console.log(process.argv)
const command = parse(argsFromArgv(process.argv))


import { e } from './entry'
console.log(e.text)

console.log(Loader, '<')