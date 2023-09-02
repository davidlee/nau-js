import { MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig, BetterSqliteDriver } from '@mikro-orm/better-sqlite';
import { Migrator } from '@mikro-orm/migrations';
// import { EntityGenerator } from '@mikro-orm/entity-generator';
// import { SeedManager } from '@mikro-orm/seeder';

import { parseArgs, parse } from './parser.js'
import * as Load from './dataLayerLoader.js'

MikroORM.init({
  entities: ['./dist/modules/users/entities', './dist/modules/projects/entities'],
  entitiesTs: ['./src/modules/users/entities', './src/modules/projects/entities'],
  // optionally you can override the base directory (defaults to `process.cwd()`)
  // baseDir: process.cwd(),
  metadataProvider: TsMorphMetadataProvider,
  driver: BetterSqliteDriver,
    migrations: {
    tableName: 'mikro_orm_migrations', // migrations table name
    path: process.cwd() + '/src/migrations', // path to folder with migration files
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // run each migration inside transaction
    dropTables: true, // allow to disable table dropping
    // disableForeignKeys: true, // try to disable foreign_key_checks (or equivalent)
    allOrNothing: true, // run all migrations in current batch in master transaction
    emit: 'ts', // migration generation mode
  },
});


export default defineConfig({
  dbName: 'test',
  extensions: [Migrator],
});

async function main() {
  // ... you will write your Prisma Client queries here
  const command = parseArgs(process.argv)
  const dispatcher = Load.dispatcher()

  const res = dispatcher.dispatchCommand(command)
  console.log(res)
}

main()