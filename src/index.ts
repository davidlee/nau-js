import 'reflect-metadata'

import { Container, Service } from 'typedi'

import { parseArgs } from './parser.js'
import { dispatch, exit } from './dispatcher.js'

async function main() {
  // @UseRequestContext()
  const command = parseArgs(process.argv)
  const res = dispatch(command)
  console.log(res)
  exit()
  
}

main()