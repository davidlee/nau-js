import { parseArgs, parse } from './parser'
import * as Load from './dataLayerLoader'

const command = parseArgs(process.argv)
const dispatch = Load.dispatcher()

const res = dispatch.issueCommand(command)
console.log(res)
