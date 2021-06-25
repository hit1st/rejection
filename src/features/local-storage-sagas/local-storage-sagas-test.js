import { describe } from 'riteway'

import { put, call } from 'redux-saga/effects'
import { fetchState, getLocalState } from './local-storage-sagas'
import { handleLocalState } from '../rejection/rejection-reducer.js'

describe('getLocalState', async (assert) => {
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


describe('fetchState Saga test', async (assert) => {
  const iterator = fetchState()

  assert({
    given: 'no arguments',
    should: 'call getLocalState(undefined)',
    actual: iterator.next().value,
    expected: call(getLocalState, undefined)
  })

  assert({
    given: 'no arguments',
    should: 'call JSON.parse(undefined)',
    actual: iterator.next().value,
    expected: call(JSON.parse, undefined)
  })

  assert({
    given: 'no arguments',
    should: 'put handleLocalState([])',
    actual: iterator.next().value,
    expected: put(handleLocalState([]))
  })

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })

  {
    const state = JSON.stringify(
      [
        {
          question: 'May I have a raise?',
          askee: 'Boss',
          status: 'Rejected'
        }
      ]
    )

    const iterator = fetchState(state)

    assert({
      given: 'an argument',
      should: `'call getLocalState(JSON.stringify(state))`,
      actual: iterator.next().value,
      expected: call(getLocalState, state)
    })

    assert({
      given: 'an argument',
      should: 'call JSON.parse(state)',
      actual: iterator.next().value,
      expected: call(JSON.parse, undefined)
    })

    assert({
      given: 'an argument',
      should: 'put handleLocalState([])',
      actual: iterator.next().value,
      expected: put(handleLocalState(undefined))
    })

    assert({
      given: 'an argument',
      should: 'be done',
      actual: iterator.next(),
      expected: { done: true, value: undefined }
    })
  }
})
