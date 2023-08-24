import {test} from 'ava'

test.test('foo', (t) => {
  t.pass()
})

test.test('bar', async (t) => {
  const bar = Promise.resolve('bar')
  t.is(await bar, 'bar')
})
