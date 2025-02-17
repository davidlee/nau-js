
enum TokenKind {
  Command  = 'commands',
  Filter   = 'filters',
  Modifier = 'modifiers',
  Ids      = 'filters.ids',
}

import { CommandName } from './commandHandler.js'

export type CommandConfig = {
  name:          CommandName
  aliases:       string[]
  expect:        TokenKind[]
  subcommands:   CommandConfig[]
  confirmation?: boolean 
}

const CommandConfigs: CommandConfig[] = [
  {
    name: CommandName.add,
    aliases: [],
    expect: [TokenKind.Modifier],
    subcommands: [],
  },
  {
    name: CommandName.modify,
    aliases: [],
    expect: [TokenKind.Filter, TokenKind.Modifier],
    subcommands: [],
  },
  {
    name: CommandName.remove,
    aliases: ['rm'],
    expect: [TokenKind.Filter],
    subcommands: [],
  },
  {
    name: CommandName.list,
    aliases: ['ls'],
    expect: [TokenKind.Filter],
    subcommands: [],
  },
  {
    name: CommandName.context,
    aliases: ['@'],
    expect: [TokenKind.Modifier],
    subcommands: [],
  },
  {
    name: CommandName.done,
    aliases: ['x'],
    expect: [TokenKind.Filter],
    subcommands: [],
  },
  {
    name: CommandName.undo,
    aliases: [],
    expect: [TokenKind.Filter],
    subcommands: [],
  },
  {
    name: CommandName.config,
    aliases: ['cfg'],
    expect: [TokenKind.Modifier],
    subcommands: [], // ...
  },
]
// no reason it should change
Object.freeze(CommandConfigs)

export type CommandConfigList = {
  [key: string]: CommandConfig
}

// {tags: [ ... ], groupName: [ ... ]}
export type TagSet = {
  [key: string]: string[]
}

export type ParsedCommandArgs = {
  filters: {
    ids:   number[]
    tags:  TagSet
    words: string[]
  }
  modifiers: {
    tags:  TagSet
    words: string[]
  }
}

export type Command = {
  command: CommandName[]
}

export type ParsedCommand = Command & ParsedCommandArgs 

type ParsingState = {
  tokens: string[]
  processedIndices: TokenKind[]
  firstCommandIndex: number 
}

type State = ParsingState & ParsedCommand

function buildState(tokens: string[]): State {
  return {
    tokens: tokens,
    command: [],
    processedIndices: [],
    firstCommandIndex: -1,
    filters: {
      ids:   [],
      tags:  {},
      words: [],
    },
    modifiers: {
      tags:  {},
      words: [],
    },
  } as State
}

// remove data only needed for tracking parser state, 
// leaving a command, any subcommands, and filters + modifiers
function extractCommand(state: State): ParsedCommand {
  const { tokens, processedIndices, ...parsed } = state
  return parsed
}


// https://taskwarrior.org/docs/syntax/
// task <filter> <command> <modifications> <miscellaneous>
//
// first, find the first thing that looks like a command
// everything before it is a filter (ids, etc)
// everything after it is a modification
export function parse(tokens: string[]): ParsedCommand {
  let state = buildState(tokens)
      state = parseCommands(state) 
  
  // how we interpret remaining tokens depends on whether they're 
  // before or after a command
  
  state.tokens.forEach((word, i) => {
    if(state.processedIndices[i] === undefined) {
      // todo match IDs, tags, etc ... otherwise
      // just treat as a word
      if (i < state.firstCommandIndex || state.firstCommandIndex < 0) {
        state.processedIndices[i] = TokenKind.Filter
        state.filters.words.push(word)
      } else {
        state.processedIndices[i] = TokenKind.Modifier
        state.modifiers.words.push(word)
      }
    }
  })
  return extractCommand(state)
}

function parseCommands(state: State): State {
  let validCommands = CommandConfigs

  // find the command [and any subcommands]
  for (let i = 0; i < state.tokens.length; i++) {
    const word = state.tokens[i]
    const command: CommandConfig | null = recogniseCommand(word, validCommands)

    if (command) {
      state.processedIndices[i] = TokenKind.Command
      state.command.push(command.name)
      validCommands = command.subcommands
      // there are no valid subcommands: we're done 
      if (validCommands.length === 0) 
        break
    } else if(state.processedIndices.some( e => {e === TokenKind.Command})) 
      // we've previously found a command, but matched no valid subcommand
        break 
  }

  if (state.command.length === 0)  
    state.command.push(CommandName.list) 
  
  state.firstCommandIndex = state.processedIndices.indexOf(TokenKind.Command)

  return state 
}

export function parseArgs(argv: string[]): ParsedCommand {
  return parse(argsFromArgv(argv))
}

function commandAliases(cmds: CommandConfig[]=CommandConfigs): CommandConfigList {
  const o: CommandConfigList = {}
  cmds.map((c) =>
    c.aliases.forEach((alias) => {
      o[alias] = c
    }),
  )
  return o
}
//
// matchers
//

export function recogniseCommand(word: string, candidates=CommandConfigs): CommandConfig | null {
  // check for exact matches of any aliases
  const aliases = commandAliases(candidates)
  if (Object.keys(aliases).includes(word)) return aliases[word]

  // otherwise, check for a partial unique match of any command
  const rx = new RegExp('^' + word)
  const matches = candidates.filter((el) => el.name.match(rx))

  if (matches.length === 1)
    // *unique* match
    return matches[0]
  else return null
}

// [3,5] -> [3,4,5]
function unrollIntRange(range: number[]): number[] {
  return Array.from({ length: range[0] - range[1] + 1 }, (_, i) => range[0] + i)
}

// parse a comma-separated list of ints, or ranges of ints, eg:
// 8,9-11,16,3 -> [8,9,10,11,16,3]
function recogniseIds(word: string): number[] | null {
  if (!word) return null

  const chunks = word.split(',').map((chunk) => {
    if (chunk.match(/^[0-9]+-[0-9]+$/)) {
      // we have a range - unroll it
      return unrollIntRange(chunk.split('-').map((c) => parseInt(c)))
    } else if (chunk.match(/^\d+$/)) {
      // just a number
      return parseInt(chunk)
    } else return null
  })
  return chunks.flat().filter((c) => typeof c === 'number') as number[]
}

// function recogniseTags()
// function recognisePriority()
// function recogniseParent()

// utility functions

export function argsFromArgv(argv: string[]): string[] {
  return argv.slice(2) // .filter((arg) => !(arg === '--'))
}
