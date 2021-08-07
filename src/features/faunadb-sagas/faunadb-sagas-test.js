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
  handleFetchStateError,
  handleSaveRejectionError
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

  {
    const simulatedNetworkResponseData = 'simulated network response data';
    assert({
      given: 'no arguments',
      should: 'put addFetchedQuestions(simulatedNetworkResponseData)',
      actual: iterator.next(simulatedNetworkResponseData).value,
      expected: put(addFetchedQuestions(simulatedNetworkResponseData))
    });
  }

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  });

  {
    const NetworkError = 'this is an error';
    const iterator = fetchState();

    iterator.next().value;
    iterator.next().value;
    assert({
      given: 'a network error',
      should: 'put handleFetchStateError(err)',
      actual: iterator.throw(NetworkError).value,
      expected: put(handleFetchStateError(NetworkError))
    });
    iterator.next();
  }
});

describe('saveRejection', async (assert) => {
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
    const data = {
      question: 'question',
      askee: 'askee',
      status: 'Accepted',
      id: 'id',
      timestamp: 'timestamp'
    };

    assert({
      given: 'no arguments',
      should: 'put addQuestion(data)',
      actual: iterator.next(data).value,
      expected: put(addQuestion(data))
    });
  }

  assert({
    given: 'no arguments',
    should: 'be done',
    actual: iterator.next(),
    expected: { done: true, value: undefined }
  });

  {
    const NetworkError = 'this is an error';
    const iterator = saveRejection();

    iterator.next().value;
    iterator.next().value;
    assert({
      given: 'a network error',
      should: 'put handleSaveRejectionError(err)',
      actual: iterator.throw(NetworkError).value,
      expected: put(handleSaveRejectionError(NetworkError))
    });
    iterator.next();
  }
});
