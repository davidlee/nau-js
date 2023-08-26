import { parseArgs } from 'node:util'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/pipeable'
import { validateHeaderName } from 'node:http'

export type Command = {
  name: string
  ids?: number[]
  rest?: string[]
}

enum NumArgs {
  None,
  NoneOrOne,
  One,
  OneOrMore,
  Any,
}

const aliases = {
  rm: 'remove',
  '@': 'context',
  cfg: 'config',
}

const commands = {
  add: {
    ids: false,
    rest: NumArgs.OneOrMore,
  },
  modify: {
    ids: true,
    rest: NumArgs.OneOrMore,
  },
  remove: {
    ids: true,
    rest: NumArgs.None,
  },
  context: {
    ids: false,
    rest: NumArgs.One,
  },
  done: {
    ids: true,
    rest: NumArgs.None,
  },
  undo: {
    ids: true,
    rest: NumArgs.None,
  },
  config: {
    ids: true,
    rest: NumArgs.OneOrMore,
    subcommands: [
      //
    ],
  },
  _default: {
    ids: null,
    rest: NumArgs.Any,
  },
}

const commandNames = Object.keys(commands)

export function argsFromArgv(argv: string[]): string[] {
  return argv.slice(2).filter((arg) => !(arg === '--'))
}

// https://taskwarrior.org/docs/syntax/
// task <filter> <command> <modifications> <miscellaneous>
export function parseCommand(tokens: string[], recur = true): Command | null {
  if (tokens.length === 0) return null
  let key = recogniseCommand(tokens[0])
  let cmd = commands[key as keyof typeof commands]
  if (cmd) {
    if (cmd.ids !== false) {
      if (typeof tokens[1] !== 'string') throw new Error('No task ID specified') 
      const ids = recogniseIds(tokens[1])
      if (ids) {
        const rest = tokens.slice(2)
        if (validateRest(cmd.rest, rest)) {
          return {
            name: key as string,
            ids: ids,
            rest: rest,
          }
        } else {
          throw new Error(`Wrong number of arguments: ${rest}`)
        }
      } else {
        throw new Error(`No task ID specified: ${tokens[1]}`)
      }
    } else {
      // console.log('no ids')
      const rest = tokens.slice(1)
      if (validateRest(cmd.rest, rest)) {
        return {
          name: key as string,
          rest: rest,
        }
      } else {
        throw new Error(`Wrong number of arguments: ${rest}`)
      }
    }
  } else if (recur) {
    // console.log('no command')
    const [first, second, ...rest] = tokens
    return parseCommand([second, first, ...rest], false)
  } else {
    // we tried
    return null
  }
}

export function recogniseCommand(word: string): string | null {
  if (word in aliases) return aliases[word as keyof typeof aliases]
  const matches = commandNames.filter((name) =>
    name.match(new RegExp('^' + word)),
  )
  // if (matches.length > 0) console.log(matches)
  return matches.length === 1 ? matches[0] : null
}

function recogniseIds(word: string): number[] | null {
  // console.log('ids', word, word.match, word.match(/^\d+$/))  
  if (word === null || word.match(/\d+/) === null) return null

  const chunks = word.split(',').map( chunk => {
    // console.log('ch:', chunk)
    if (chunk && chunk.match(/^[0-9]+-[0-9]+$/)) {
      // console.log('range',chunk, chunk.split('-'))
      const [start, end] = chunk.split('-').map((c) => parseInt(c))
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    } else if (chunk.match(/^\d+$/)) {
      return parseInt(chunk)
    } else {
      return null  
    }})
    // console.log('chunks', chunks) 
    return chunks.flat().filter((c) => typeof c === 'number') as number[]
  }
    

function validateRest(req: NumArgs, words: string[]) {
  switch (req) {
    case NumArgs.None:
      return true 
      // return words.length === 0
    case NumArgs.NoneOrOne:
      return true
      // return words.length <= 1
    case NumArgs.One:
      return words.length !== 0
      // return words.length === 1
    case NumArgs.OneOrMore:
      return words.length !== 0
      // return words.length >= 1
    case NumArgs.Any:
      return true
  }
}
