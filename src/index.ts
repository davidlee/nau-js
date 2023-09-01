import { parseArgs, parse } from './parser.js'
import * as Load from './dataLayerLoader.js'
//import { prisma, bark } from './client.js'
import { MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

MikroORM.init({
  metadataProvider: TsMorphMetadataProvider,
});
import { defineConfig } from '@mikro-orm/better-sqlite';
import { Migrator } from '@mikro-orm/migrations';
// import { EntityGenerator } from '@mikro-orm/entity-generator';
// import { SeedManager } from '@mikro-orm/seeder';

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