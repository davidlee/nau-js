import { parseArgs } from 'node:util'

const options = {
  version: {
    type: 'string',
    short: 'v',
  },
  help: {
    type: 'string',
  },
  verbose: {
    type: 'string',
    short: 'V',
  },
  
} as const

const { values, tokens } = parseArgs({ options, tokens: true, strict: false })

console.log(values, "-------??", tokens)

export { values, tokens }
