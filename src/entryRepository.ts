import { Entry } from './entry'

interface RepositoryAdapter {
  
}
export class EntryRepository {
  adapter: RepositoryAdapter

  constructor(adapter: RepositoryAdapter) {
    this.adapter = adapter
  }
}