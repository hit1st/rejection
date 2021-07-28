import { describe } from 'riteway';

import { reducer, addQuestion, getRejections, getScore, handleLocalState, clearRejections } from './rejection-reducer.js';

describe('reducer/addQuestion', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: addQuestion(),
    expected: undefined,
  });

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted',
      id: 12345,
      timestamp: 12345
    };

    const expected = {
      type: 'REJECTION::ADD_QUESTION',
      payload: question
    };

    assert({
      given: 'a new question',
      should: 'return an action object',
      actual: addQuestion(question),
      expected
    });
  }

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted',
    };

    assert({
      given: 'a new question',
      should: 'return have an id property',
      actual: !!addQuestion(question).payload.id,
      expected: true
    });
  }

  {
    const question = {
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: 'Accepted',
    };

    assert({
      given: 'a new question',
      should: 'return have a timestamp property',
      actual: !!addQuestion(question).payload.timestamp,
      expected: true
    });
  }
});

describe('reducer/handleLocalState', async assert => {
  assert({
    given: 'no arguments',
    should: 'return action object',
    actual: handleLocalState(),
    expected: {
      type: 'ADD_LOCAL_STATE',
      payload: []
    },
  });

  {
    const state = {
      rejections: [
        {
          question: 'Can I have a raise?',
          askee: 'Boss',
          status: 'Accepted'
        },
        {
          question: 'Can you buy me a burger?',
          askee: 'Coworker',
          status: 'Rejected'
        },
        {
          question: 'Can I take some time to grab my wallet?',
          askee: 'Boss',
          status: 'Accepted'
        },
      ]
    };

    const expected = {
      type: 'ADD_LOCAL_STATE',
      payload: [...state.rejections]
    };

    assert({
      given: 'a local state',
      should: 'return an action object',
      actual: handleLocalState(state),
      expected
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
      status: 'Accepted',
      id: 12345,
      timestamp: 12345
    };

    assert({
      given: 'a new question',
      should: 'add the question to the state',
      actual: reducer(reducer(), addQuestion(question)),
      expected: [question]
    });
  }

  {
    const state = {
      rejections: [
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
      ]
    };

    assert({
      given: 'a new state',
      should: 'return new state',
      actual: reducer(reducer(), handleLocalState(state)),
      expected: state.rejections
    });
  }
});

describe('reducer/getRejections', async assert => {
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