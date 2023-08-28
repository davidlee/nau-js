// import * as R from 'ramda'

export function argsFromArgv(argv: string[]): string[] {
  return argv.slice(2) // .filter((arg) => !(arg === '--'))
}

enum TokenKind {
  Command  = 'commands',
  Filter   = 'filters',
  Modifier = 'modifiers',
  Ids      = 'filters.ids',
}

export type CommandConfig = {
  name:        string,
  aliases:     string[],
  expect:      TokenKind[],
  subcommands: CommandConfig[],
}

const CommandConfigs: CommandConfig[] = Object.freeze([
  {
    name: 'add',
    aliases: [],
    expect: [TokenKind.Modifier],
    subcommands: []
  },
  {
    name: 'modify',
    aliases: [],
    expect: [TokenKind.Filter, TokenKind.Modifier],
    subcommands: []
  },
  {
    name: 'remove',
    aliases: ['rm'],
    expect: [TokenKind.Filter],
    subcommands: []
  },
  {
    name: 'context',
    aliases: ['@'],
    expect: [TokenKind.Modifier],
    subcommands: []
  },
  {
    name: 'done',
    aliases: ['x'],
    expect: [TokenKind.Filter],
    subcommands: []
  },
  {
    name: 'undo',
    aliases: [],
    expect: [TokenKind.Filter],
    subcommands: []
  },
  {
    name: 'config',
    aliases: ['cfg'],
    expect: [TokenKind.Modifier],
    subcommands: [] // ...
  },
])
// const CommandConfigNames = CommandConfigs.map(el => el.name)

export type CommandConfigList = {
 [key: string]: CommandConfig 
}

// Zod? ValidCommandConfig?
export type ParsedCommand = {
  filters: {
    ids:       number[],
    tags:      string[],
    words:     string[], 
  },
  command:     string[],
  modifiers: {
    tags:      string[],
    words:     string[],
  }
}
type ParsingState = {
  tokens:      string[],
  processedIndices: TokenKind[],
}

type State = ParsingState & ParsedCommand

function buildState(tokens: string[]): State {
  return {
    tokens:           tokens,
    command:          [],
    processedIndices: [],
    filters:{
      ids:            [],
      tags:           [],
      words:          [], 
    },
    modifiers: {
      tags:           [],
      words:          [],
    }
  } as State
}

function extractCommand(state:State): ParsedCommand {
  // return { 
  //   filters:   state.filters,
  //   command:   state.command,
  //   modifiers: state.modifiers,
  // } as ParsedCommand

  const { tokens, processedIndices, ...parsed } = state
  return parsed 
}

// https://taskwarrior.org/docs/syntax/
// task <filter> <command> <modifications> <miscellaneous>

  // first, find the first thing that looks like a command
  // everything before it is a filter (ids, etc)
  // everything after it is a modification

export function parse(tokens: string[]): ParsedCommand | Error {
  let state = buildState(tokens)

  for(let i = 0; i < tokens.length; i++) {
    const word = tokens[i]
    const command: CommandConfig | null = recogniseCommand(word)

    if(command) {
      // if(command.subcommands.length > 0)  // FIXME track depth
      state.processedIndices[i] = TokenKind.Command
      state.command.push(command.name)
      break // FIXME subcommands
    }
  }
  
  return extractCommand(state as State)
}


function commandAliases(cmds: CommandConfig[] = CommandConfigs): CommandConfigList {
  const o: CommandConfigList= {}
  cmds.map(c => c.aliases.forEach(alias => {o[alias] = c}))
  return o
}
//
// matchers
//

export function recogniseCommand(word: string, candidates = CommandConfigs): CommandConfig | null {
  // check for exact matches of any aliases first:
  const aliases = commandAliases(candidates)
  if (Object.keys(aliases).includes(word)) return aliases[word] 
  // let aliasedCommandConfig: CommandConfig | null = aliases[word]
  // if (aliasedCommandConfig) return aliasedCommandConfig
    
  // otherwise, check for a partial unique match of any command
  const rx = new RegExp('^' + word)
  const matches = candidates.filter(el => el.name.match(rx))
  
  if(matches.length === 1) // *unique* match 
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

  const chunks = word.split(',').map( chunk => {
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



    
