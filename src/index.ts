import { parseArgs, parse } from './parser.js'
import * as Load from './dataLayerLoader.js'

const command = parseArgs(process.argv)
const dispatcher = Load.dispatcher()

const res = dispatcher.dispatchCommand(command)
console.log(res)
