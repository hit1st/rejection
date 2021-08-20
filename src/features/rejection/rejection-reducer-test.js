import { describe } from 'riteway';

import rejectionReducer,
{ 
  addQuestion,
  getRejections,
  getScore,
  addFetchedQuestions
} from './rejection-reducer.js';

describe('getRejections/rejectionReducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: getRejections({ rejections: rejectionReducer() }),
    expected: []
  });
});

describe('getRejections/rejectionReducer/addQuestion', async assert => {
  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted',
      id: 'id',
      timestamp: 'ts'
    };

    assert({
      given: 'a new question',
      should: 'add the question to the state',
      actual: getRejections({ rejections: rejectionReducer(rejectionReducer(), addQuestion(question)) }),
      expected: [question]
    });
  }
});

describe('getRejections/rejectionReducer/addFetchedQuestions', async assert => {
  {
    const state = [
      {
        question: 'Can I have a raise?',
        askee: 'Boss',
        status: 'Accepted',
        id: 12345,
        timestamp: 12345
      },
      {
        question: 'Can you buy me a burger?',
        askee: 'Coworker',
        status: 'Rejected',
        id: 12346,
        timestamp: 12346
      },
      {
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: 'Accepted',
        id: 12347,
        timestamp: 12347
      },
    ];

    assert({
      given: 'questions',
      should: 'return questions in state',
      actual: getRejections({ rejections: rejectionReducer(rejectionReducer(), addFetchedQuestions(state)) }),
      expected: state
    });
  }
});

describe('getRejections/rejectionReducer/getScore', async assert => {
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

  const state = { rejections: actions.reduce(rejectionReducer, []) };

  assert({
    given: 'some questions',
    should: 'calculate the correct score',
    actual: getScore(getRejections(state)),
    expected: 12
  });
});