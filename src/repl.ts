import * as repl from 'node:repl'
import * as E from './entry.js'
import { Value } from '@sinclair/typebox/value'
import { parseArgs, parse } from './parser.js'
import * as Load from './dataLayerLoader.js'

const replServer = repl.start('> ')

replServer.context.E          = E
replServer.context.Entry      = E.Entry
replServer.context.Value      = Value
replServer.context.dispatcher = Load.dispatcher()
replServer.context.parse      = parse

