import { parseArgs, parse } from './parser'
import * as Load from './dataLayerLoader'

const command = parseArgs(process.argv)
const dispatcher = Load.dispatcher()

const res = dispatcher.dispatchCommand(command)
console.log(res)
