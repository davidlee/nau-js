import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { MemoryStoreAdapter } from '../src/memoryStoreAdapter'

// https://taskwarrior.org/docs/syntax/

describe('memoryStoreAdapter', () => {
  test('write: ', (t) => {
    assert.equal(recogniseCommand('add')?.name, 'add')
  })

  test('read: -> ', (t) => {
    assert.equal(recogniseCommand('ad')?.name, 'add')
  })
}
