import assert from 'node:assert/strict'
import { beforeEach, describe, test } from 'node:test'
import { MemoryStoreAdapter } from '../src/memoryStoreAdapter.js'
import * as E from '../src/entry.js'
import { Value } from '@sinclair/typebox/value'

// https://taskwarrior.org/docs/syntax/
let mem: MemoryStoreAdapter | null = null
let e: E.Entry = Value.Create(E.Entry)

describe('memoryStoreAdapter', () => {
  beforeEach(() => {mem = new MemoryStoreAdapter()})
  
  test('persistEntry: returns true ', (t) => {
    assert.equal(mem!.persistEntry(e), true)
  })

  test('read', (t) => {
    assert.deepEqual(mem!.read(), Value.Decode(E.Entry, e))
  })

})
