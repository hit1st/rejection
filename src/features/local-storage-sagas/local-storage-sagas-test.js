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
  clearState
} from './local-storage-sagas'
import { handleLocalState, getRejections } from '../rejection/rejection-reducer.js'

describe('local-storage-sagas/getLocalState', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'should return empty array string',
    actual: getLocalState(),
    expected: '[]'
  })

  {
    const state = JSON.stringify([{
      question: 'Can I have a job?',
      askee: 'Potential Employer',
      status: 'Rejected'
    }])

    assert({
      given: `argument other than 'state'`,
      should: 'should return argument',
      actual: getLocalState(state),
      expected: state
    });
  }
})


describe('local-storage-sagas/fetchState', async (assert) => {
  const iterator = fetchState()

  assert({
    given: 'no arguments',
    should: `call getLocalState('state')`,
    actual: iterator.next().value,
    expected: call(getLocalState, 'state')
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
    should: 'call JSON.stringify({ rejections: null })',
    actual: iterator.next().value,
    expected: call(JSON.stringify, { rejections: null })
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