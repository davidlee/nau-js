import * as R from 'ramda'

enum TokenKind {
  Command  = 'commands',
  Filter   = 'filters',
  Modifier = 'modifiers',
}

export type Command = {
  name:        string,
  aliases:     string[],
  expect:      TokenKind[],
  subcommands: Command[],
}

const Commands: Command[] = [
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
]
const CommandNames = Commands.map(el => el.name)

export type CommandList = {
 [key: string]: Command 
}

interface State {
  tokens:    string[],
  processedIndices: TokenKind[],
  filters: {
    ids:     number[],
    tags:    string[],
    words:   string[], 
  },
  command:   string[],
  modifiers: {
    tags:    string[],
    words:   string[],
  }
}

function buildState(tokens: string[]): State {
  return {
    tokens: tokens,
    command: [],
    processedIndices: [],
    filters:{
      ids:   [],
      tags:  [],
      words: [], 
    },
    modifiers: {
      tags:  [],
      words: [],
    }
  } as State
}

export function argsFromArgv(argv: string[]): string[] {
  return argv.slice(2).filter((arg) => !(arg === '--'))
}

function commandAliases(cmds: Command[] = Commands): CommandList {
  const o: CommandList= {}
  cmds.map(c => c.aliases.forEach(alias => {o[alias] = c}))
  return o
}
//
// matchers
//

export function recogniseCommand(word: string, candidates = Commands): Command | null {
  // check for exact matches of any aliases first:
  const aliases = commandAliases(candidates)
  if (Object.keys(aliases).includes(word)) return aliases[word] 
  // let aliasedCommand: Command | null = aliases[word]
  // if (aliasedCommand) return aliasedCommand
    
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
export function findCommand(state:State): boolean {
  
  return false
}

type IdsFound = {ids: number[], indices: number[]} 

export function findIds(tokens: string[]): IdsFound | null {
  const res: IdsFound = {indices: [], ids: []}
  tokens.forEach((el, i) => {
    const ids = recogniseIds(el)
    if(ids !== null){ ids.forEach( id => res.ids.push(id)) }
  })
  if (res.ids.length !== 0) { return res } else { return null}
}

// https://taskwarrior.org/docs/syntax/
// task <filter> <command> <modifications> <miscellaneous>

  // first, find the first thing that looks like a command
  // everything before it is a filter (ids, etc)
  // everything after it is a modification

export function parse(tokens: string[]): Command | null {
  let state = buildState(tokens)

  for(let i = 0; i < tokens.length; i++) {
    const word = tokens[i]
    const command: Command | null = recogniseCommand(word)

    if(command) {
      if(command.subcommands.length > 0) { // FIXME track n
        
      }
      
    } 
  }
  
  if(state.command.length === 0) {
    // entries before are filters
    // entries after are modifications

    // classify each with a regexp match, then process
    
  } else {
    // try to find a report, etc

    // otherwise we're doing a list and treating input as filters
  }
  return null
}

    
