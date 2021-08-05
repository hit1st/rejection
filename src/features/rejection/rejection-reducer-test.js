import { describe } from 'riteway';

import { reducer, addQuestion, getRejections, getScore, addFetchedQuestions } from './rejection-reducer.js';

describe('reducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: reducer(),
    expected: []
  });
});

describe('reducer/addQuestion', async assert => {
  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted'
    };

    assert({
      given: 'a new question',
      should: 'add the question to the state',
      actual: reducer(reducer(), addQuestion(question)),
      expected: [question]
    });
  }
});

describe('reducer/addFetchedQuestions', async assert => {
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
      actual: reducer(reducer(), addFetchedQuestions(state)),
      expected: state
    });
  }
});

describe('getRejections', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: getRejections(),
    expected: undefined
  });
  
  {
    const state = {};

    assert({
      given: 'invalid state',
      should: 'return undefined',
      actual: getRejections(state),
      expected: undefined
    });    
  }

  {
    const state = {
      rejections: [
        {
          question: 'Can I have a raise?',
          askee: 'Boss',
          status: 'Accepted'
        }
      ]
    };

    assert({
      given: 'state',
      should: 'return an array of rejections',
      actual: getRejections(state),
      expected: [...state.rejections]
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