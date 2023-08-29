import { EntryRepository } from './entryRepository'
import { Entry } from './entry'

interface Args {
  filters: string[]
  modifiers: string[]
}

export class CommandHandler {
  private reader: EntryRepository
  private writer: EntryRepository

  add: Function
  modify: Function
  remove: Function
  list: Function
  configure: Function

  constructor(read: EntryRepository, write: EntryRepository) {
    this.reader = read
    this.writer = write

    this.add = add
    this.modify = modify
    this.remove = remove
    this.list = list
    this.configure = configure
  }
}

function add(args: Args) {
  console.log('called', args)
}
function modify(args: Args) {}
function remove(args: Args) {}
function list(args: Args) {}
function configure(args: Args) {}
