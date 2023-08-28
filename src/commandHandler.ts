import { EntryRepository } from "./entryRepository"

interface Args {
  filters:   string[],
  modifiers: string[],
}

export class CommandHandler {
  entryRepository: EntryRepository
  add:       Function
  modify:    Function
  remove:    Function
  list:      Function
  configure: Function

  constructor(repo:EntryRepository) {
    this.entryRepository = repo
    
    this.add =       add
    this.modify =    modify
    this.remove =    remove
    this.list =      list 
    this.configure = configure
  }
}

function add(args:Args)         {
  console.log("called",args)
}

function modify(args:Args)      {}
function remove(args:Args)      {}
function list(args:Args)        {}
function configure(args:Args)   {}
