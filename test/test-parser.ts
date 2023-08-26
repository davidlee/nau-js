import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { parse, parseCommand, recogniseCommand } from '../src/parser'

// https://taskwarrior.org/docs/syntax/

describe('recogniseCommand', () => {
  test('recognise: add', (t) => {
    assert.equal(recogniseCommand('add'), 'add')
  })

  test('recognise: ad -> add', (t) => {
    assert.equal(recogniseCommand('ad'), 'add')
  })

  test('null: addd', (t) => {
    assert.equal(recogniseCommand('addd'), null)
  })

  test('recognise alias: rm -> remove', (t) => {
    assert.equal(recogniseCommand('rm'), 'remove')
  })

  test('recognise alias: @ -> context', (t) => {
    assert.equal(recogniseCommand('@'), 'context')
  })

  test('null: co', (t) => {
    assert.equal(recogniseCommand('co'), null)
  })

  test('null: con', (t) => {
    assert.equal(recogniseCommand('con'), null)
  })

  test('null: conz', (t) => {
    assert.equal(recogniseCommand('conz'), null)
  })

  test('recognise: cont -> context', (t) => {
    assert.equal(recogniseCommand('cont'), 'context')
  })

  test('recognise: conf -> config', (t) => {
    assert.equal(recogniseCommand('conf'), 'config')
  })
})
describe('parse', () => {
  test('16 mod something', (t) => {
    let input = '16 mod something'.split(' ')
    let result = parse(input)
    assert.deepEqual(result, { input: 'mod', output: 'modify', index: 1 })
  })
})
describe('parseCommand', () => {

  test('parse: add something', (t) => {
    let input = 'add something'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, { name: 'add', rest: ['something'] })
  })

  test('parse: a is for add', (t) => {
    let input = 'add is for add'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, { name: 'add', rest: ['is', 'for', 'add'] })
  })

  test('error: add', (t) => {
    let input = 'add'.split(' ')
    assert.throws(
      () => {
        parseCommand(input)
      },
      {
        name: 'Error',
        message: /Wrong number of arguments/,
      },
    )
  })

  test('error: remove', (t) => {
    let input = ['remove']
    
    assert.throws(
      () => {
        parseCommand(input)
      },
      {
        name: 'Error',
        message: /No task ID/,
      },
    )
  })

  test('parse: remove 13', (t) => {
    let input = 'remove 13'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, { name: 'remove', ids: [13], rest: [] })
  })

  test('parse: remove 26 with bonus crap', (t) => {
    let input = 'remove 26 with bonus crap'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, { name: 'remove', ids: [26], rest: ['with','bonus','crap'] })
  })

  test('parse: 5 done', (t) => {
    let input = '5 done'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, { name: 'done', ids: [5], rest: [] })
  })

  test('parse: rm 20', (t) => {
    let input = 'rm 20'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, { name: 'remove', ids: [20], rest: [] })
  })

  test('parse: nonsense returns null', (t) => {
    assert.equal(parseCommand(['nonsense']), null)
  })

  test('parse: rm 9-15', (t) => {
    let input = 'rm 9-15'.split(' ')
    let result = parseCommand(input)
    assert.deepEqual(result, {name: 'remove', ids: [9,10,11,12,13,14,15], rest:[] })
  })
  // todo test  --
})
