import { describe } from 'riteway'

import {
  put,
  call,
  select
} from 'redux-saga/effects'

import {
  fetchID,
  fetchState,
  saveRejection,
  handleFetchState,
} from './faunadb-sagas'
import { updateID, getID } from '../id-reducer/id-reducer.js';
import { addFetchedQuestions, addQuestion } from '../rejection/rejection-reducer.js';
import { useID, useRejections, createRejection } from '../faunagql/api.js';


describe('fetchID', async (assert) => {
  const iterator = fetchID();

  assert({
    given: 'no arguments',
    should: `call useID`,
    actual: iterator.next().value,
    expected: call(useID)
  });

  assert({
    given: 'no arguments',
    should: 'put updateID(undefined)',
    actual: iterator.next().value,
    expected: put(updateID(undefined))
  });

  assert({
    given: 'no arguments',
    should: 'put handleFetchState()',
    actual: iterator.next().value,
    expected: put(handleFetchState())
  });

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })
});

describe('fetchState', async (assert) => {
  const iterator = fetchState();

  assert({
    given: 'no arguments',
    should: `call select(getID)`,
    actual: iterator.next().value,
    expected: select(getID)
  });

  assert({
    given: 'no arguments',
    should: 'call useRejections(undefined)',
    actual: iterator.next().value,
    expected: call(useRejections, undefined)
  });

  assert({
    given: 'no arguments',
    should: 'put addFetchedQuestions()',
    actual: iterator.next().value,
    expected: put(addFetchedQuestions())
  });

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })
});

describe('saveRejection', async (assert) => {
  // const action = {
  //   payload: {
  //     question: 'question',
  //     askee: 'askee',
  //     status: 'Accepted'
  //   }
  // };

  const iterator = saveRejection();

  assert({
    given: 'no arguments',
    should: `call select(getID)`,
    actual: iterator.next().value,
    expected: select(getID)
  });

  assert({
    given: 'no arguments',
    should: 'call createRejection()',
    actual: iterator.next().value,
    expected: call(createRejection, { question: '', askee: '', status: '' } , undefined)
  });

  {
    const actual = iterator.next().value.payload.action.type;
    const expected = put(addQuestion()).payload.action.type;

    assert({
      given: 'no arguments',
      should: 'put addQuestion()',
      actual,
      expected
    })
  }

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  })
})
