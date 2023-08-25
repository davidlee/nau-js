import { parseArgs } from 'node:util'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/pipeable'
import { validateHeaderName } from 'node:http'

export type Command = {
  name: string
  ids?: number[]
  rest?: string[]
}

// TODO argParser
// const options = {
//   version: {
//     type: 'string',
//     short: 'v',
//   },
//   help: {
//     type: 'string',
//   },
//   verbose: {
//     type: 'string',
//     short: 'V',
//   },
// } as const

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
  let key = recogniseCommand(tokens[0])
  let cmd = commands[key as keyof typeof commands]
  // console.log(key)
  if (cmd) {
    if (cmd.ids !== false) {
      // console.log('ids')
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
  let chunks: undefined | number[] = undefined
  try {
    const chunks = word
      .split(',')
      .map((chunk) => {
        if (chunk.match(/^\d+$/)) {
          return parseInt(chunk)
        } else if (chunk.match(/^\d+-\d+$/)) {
          const [start, end] = chunk.split('-').map(parseInt)
          return Array.from({ length: end - start + 1 }, (_, i) => start + i)
        } else {
          throw new Error(`Invalid id: ${chunk}`)
        }
      })
      .flat()
    return chunks.every((ch) => typeof ch === 'number') ? chunks : null
  } catch (e) {
    return null
  }
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

// first check to see if the first token is an id or set of ids
//  if not, check to see if it's a command
//   if it is, check if it takes ids
//    if so, then look for the next likely ids
//     if none are found, exit with an error
//     if some are found, return the command and the ids,
//     , along with the rest of the tokens
//    if not, return the command and the rest of the tokens
//  if it isnt't a command, treat it as a search query
//   return the query command and the tokens
// if it is, set ids aside and look for a command
//  if one if not found, exit with an error
//  if one is found, check if it takes ids
//   if so, return the command and the ids
//   , along with the rest of the tokens
//   if not, exit with an error

//const { values, tokens } = parseArgs({ options, tokens: true, strict: false })

// console.log(values, tokens)
// console.log(process.argv)
// tokens.

// export { values, command }
