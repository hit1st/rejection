import { describe } from 'riteway';

import { reducer, addQuestion, getScore } from './rejection-reducer.js';

describe('reducer/addQuestion', async assert => {
  assert({
    given: 'no arguments',
    should: 'return an undefined',
    actual: addQuestion(),
    expected: undefined,
  });

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    };

    assert({
      given: 'a new question',
      should: 'have id prop',
      actual: addQuestion(question).payload.hasOwnProperty('id'),
      expected: true,
    });
  }

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    };

    assert({
      given: 'a new question',
      should: 'have timestamp prop',
      actual: addQuestion(question).payload.hasOwnProperty('timestamp'),
      expected: true,
    });
  }

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    }

  assert({
      given: 'a new question',
      should: 'have question prop',
      actual: addQuestion(question).payload.question,
      expected: question.question,
    });
  }

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    };

    assert({
      given: 'a new question',
      should: 'have askee prop',
      actual: addQuestion(question).payload.askee,
      expected: question.askee,
    });
  }

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    };

    assert({
      given: 'a new question',
      should: 'have status prop',
      actual: addQuestion(question).payload.status,
      expected: question.status,
    });
  }
});

describe('reducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: reducer(),
    expected: []
  });

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    };

    const actual = reducer(reducer(), addQuestion(question));
    const { id, timestamp } = actual[0];
    const expected = [{ ...question, id, timestamp }];

    assert({
      given: 'a new question',
      should: 'add the question to the state',
      actual,
      expected
    });
  }
});

describe('reducer/getScore', async assert => {
  const actions = [
    addQuestion({
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    }),
    addQuestion({
      question: 'Can you buy me a burger?',
      askee: 'Coworker',
      status: 'Rejected'
    }),
    addQuestion({
      question: 'Can I take some time to grab my wallet?',
      askee: 'Boss',
      status: 'Accepted'
    }),
  ];

  const state = actions.reduce(reducer, []);

  assert({
    given: 'some questions',
    should: 'calculate the correct score',
    actual: getScore(state),
    expected: 12
  });
});
