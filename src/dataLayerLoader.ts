// import * as C from './configLoader'
import * as D from './dispatcher'
import * as H from './commandHandler'
import * as R from './entryRepository'
// import * as E from './entry'
import * as F from './fileStoreAdapter'

const adapter    = new F.FileStoreAdapter('/tmp/hello')
const repo       = new R.EntryRepository(adapter)
const handler    = new H.CommandHandler(repo)
const dispatcher = new D.Dispatcher(handler)
