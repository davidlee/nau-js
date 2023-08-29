// import * as C from './configLoader'
import * as D from './dispatcher'
import * as H from './commandHandler'
import * as R from './entryRepository'
// import * as E from './entry'
import * as F from './fileStoreAdapter'

export function dispatcher() {
  const adapter = new F.FileStoreAdapter('/tmp/hello')
  const reader = new R.EntryReader(adapter)
  const writer = new R.EntryWriter(adapter)
  const handler = new H.CommandHandler(reader, writer)

  return new D.Dispatcher(handler)
}
