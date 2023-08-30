// import * as C from './configLoader'
import * as D from './dispatcher'
import * as H from './commandHandler'
import * as R from './entryRepository'
// import * as E from './entry'
import * as F from './fileStoreAdapter'
import * as M from './memoryStoreAdapter'

import { DataStoreAdapter } from './dataStoreAdapter'

interface Configuration {
  adapter: string,
  path:    string, // TODO fix typings
}

const defaults: Configuration  = {
  adapter: 'file',
  path: `${process.env.HOME}/.config/projector/entries.json`
}
export function dispatcher(options = {}) {
  const props: Configuration = {...defaults, ...options}
  let adapter: DataStoreAdapter
  
  switch(props.adapter) {
    case 'file':
      adapter = new F.FileStoreAdapter(props.path)
      break
    case 'memory':
      adapter = new M.MemoryStoreAdapter()
      break
    default:
      throw new Error('Illegal adapter')
  }
  
  const reader = new R.EntryReader(adapter)
  const writer = new R.EntryWriter(adapter)

  const handler = new H.CommandHandler(reader, writer)

  return new D.Dispatcher(handler)
}
