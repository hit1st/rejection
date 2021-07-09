import { describe } from 'riteway'

import {
  put,
  call,
  select
} from 'redux-saga/effects'
import {
  fetchState,
  saveState,
  getLocalState,
  setLocalState,
  clearLocalState,
  clearState
} from './local-storage-sagas'
import { handleLocalState, getRejections } from '../rejection/rejection-reducer.js'


describe('local-storage-sagas/fetchState', async (assert) => {
  const iterator = fetchState()

  assert({
    given: 'no arguments',
    should: `call getLocalState()`,
    actual: iterator.next().value,
    expected: call(getLocalState)
  })

  assert({
    given: 'no arguments',
    should: 'call JSON.parse(undefined)',
    actual: iterator.next().value,
    expected: call(JSON.parse, undefined)
  })

  assert({
    given: 'no arguments',
    should: 'put handleLocalState(undefined)',
    actual: iterator.next().value,
    expected: put(handleLocalState(undefined))
  })

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })
})

describe('local-storage-sagas/saveState', async (assert) => {
  const iterator = saveState()

  assert({
    given: 'no arguments',
    should: `call select()`,
    actual: iterator.next().value,
    expected: select(getRejections)
  })

  assert({
    given: 'no arguments',
    should: 'call JSON.stringify({ rejections: undefined })',
    actual: iterator.next().value,
    expected: call(JSON.stringify, { rejections: undefined })
  })

  assert({
    given: 'no arguments',
    should: 'call setLocalState(undefined)',
    actual: iterator.next().value,
    expected: call(setLocalState, undefined)
  })

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })
})

describe('local-storage-sagas/clearState ', async (assert) => {
  const iterator = clearState()

  assert({
    given: 'no arguments',
    should: 'call cleatLocalState',
    actual: iterator.next().value,
    expected: call(clearLocalState)
  })

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })
})