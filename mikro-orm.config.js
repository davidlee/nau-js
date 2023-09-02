// import  CustomBaseEntity from './entities/CustomBaseEntity.js';
// import { Entry } from './entities/Entry.js';

// import { Options } from '@mikro-orm/core';
import { BetterSqliteDriver, defineConfig } from '@mikro-orm/better-sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  driver: BetterSqliteDriver,
  dbName: 'test.db',
  // as we are using class references here, we don't need to specify `entitiesTs` option
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [Migrator],
})

