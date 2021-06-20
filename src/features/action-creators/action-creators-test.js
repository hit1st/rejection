import { describe } from 'riteway';

import { buildAction, makeActionCreator, rejectionAddQuestion } from './action-creators.js'

describe('buildAction', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: buildAction(),
    expected: undefined,
  });

  {
    const type = 'REJECTION::ADD_QUESTION';
    const payloadNames = ['payload'];
    const value = [
      {
        question: 'Can we play a game?',
        askee: 'Computer',
        status: 'Rejected',
      }
    ];

    const actual = buildAction(type, payloadNames, value);
    const expected = {
      type,
      [payloadNames[0]]: value[0]
    }

    assert({
      given: 'a type, payloadNames, and payloadValues',
      should: 'return an action object',
      actual,
      expected
    });
  }
});

describe('makeActionCreator', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: makeActionCreator(),
    expected: undefined
  });

  {
    const type = 'REJECTION::ADD_QUESTION';
    const payloadName = 'payload';

    assert({
      given: 'a type and payloadNames',
      should: 'return a function',
      actual: typeof makeActionCreator(type, payloadName),
      expected: 'function'
    });
  }
});

describe('rejectionAddQuestion', async assert => {
  const value = {
    question: 'Can we play a game?',
    askee: 'Computer',
    status: 'Rejected',
  };

  const expected = {
    type: 'REJECTION::ADD_QUESTION',
    payload: value
  };

  assert({
    given: 'a question',
    should: 'should return an add question object',
    actual: rejectionAddQuestion(value),
    expected
  });
});