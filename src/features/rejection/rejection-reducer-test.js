import { describe } from 'riteway';

import rejectionsReducer,
{ 
  addQuestion,
  getRejections,
  getScore,
  addFetchedQuestions,
  getDailyScoresForTheDuration,
  getVisibleRejections
} from './rejection-reducer.js';
import {
  showAll,
  showAccepted,
  showRejected
} from '../visibility/visibility-filter.js';



describe('getRejections/rejectionsReducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: getRejections({ rejections: rejectionsReducer() }),
    expected: []
  });
});

describe('getRejections/rejectionsReducer/addQuestion', async assert => {
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
      actual: getRejections({ rejections: rejectionsReducer(rejectionsReducer(), addQuestion(question)) }),
      expected: [question]
    });
  }
});

describe('getRejections/rejectionsReducer/addFetchedQuestions', async assert => {
  {
    const state = [
      {
        question: 'Can I have a raise?',
        askee: 'Boss',
        status: 'Accepted',
        id: 12345,
        timestamp: new Date(2021, 6, 14)
      },
      {
        question: 'Can you buy me a burger?',
        askee: 'Coworker',
        status: 'Rejected',
        id: 12346,
        timestamp: new Date(2021, 6, 15)
      },
      {
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: 'Accepted',
        id: 12347,
        timestamp: new Date(2021, 6, 21)
      },
    ];

    assert({
      given: 'questions',
      should: 'return questions in state',
      actual: getRejections({ rejections: rejectionsReducer(rejectionsReducer(), addFetchedQuestions(state)) }),
      expected: state
    });
  }
});

describe('rejectionsReducer/getScore', async assert => {
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

  const state = { rejections: actions.reduce(rejectionsReducer, []) };

  assert({
    given: 'some questions',
    should: 'calculate the correct score',
    actual: getScore(state),
    expected: 12
  });
});

describe('rejectionsReducer/getScore', async assert => {
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

  const state = { rejections: actions.reduce(rejectionsReducer, []) };

  assert({
    given: 'some questions',
    should: 'calculate the correct score',
    actual: getScore(state),
    expected: 12
  });
});

describe('rejectionsReducer/getDailyScoresForTheDuration', async assert => {
  {
    const actions = [
      addQuestion({ 
        question: 'Can I have a raise?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 6, 14)
      }),
      addQuestion({ 
        question: 'Can you buy me a burger??',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 6, 15)
      }),
      addQuestion({ 
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 6, 21)
      }),
      addQuestion({ 
        question: 'Can I have a raise again?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 6, 26)
      }),
      addQuestion({ 
        question: 'Can I have a raise this time?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 6, 27)
      }),
      addQuestion({ 
        question: 'Can I have a job?',
        askee: 'Boss',
        status: "Accepted",
        timestamp: new Date(2021, 6, 27)
      }),
      addQuestion({ 
        question: 'Can I have a job again?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 6, 28)
      }),
      addQuestion({ 
        question: 'Can I have a job this time?',
        askee: 'Boss',
        status: "Accepted",
        timestamp: new Date(2021, 7, 1)
      }),
      addQuestion({ 
        question: 'Can you buy me lunch?',
        askee: 'Boss',
        status: "Accepted",
        timestamp: new Date(2021, 7, 7)
      }),
      addQuestion({ 
        question: 'Can you buy me dinner?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: new Date(2021, 7, 7)
      })
    ];

    const state = { rejections: actions.reduce(rejectionsReducer, []) };

    const duration = [
      new Date(2021, 7, 1),
      new Date(2021, 7, 2),
      new Date(2021, 7, 3),
      new Date(2021, 7, 4),
      new Date(2021, 7, 5),
      new Date(2021, 7, 6),
      new Date(2021, 7, 7)
    ];

    const actual = getDailyScoresForTheDuration(state, duration);

    const expected = [
      { date: new Date(2021, 7, 1), score: 62 },
      { date: new Date(2021, 7, 2), score: 62 },
      { date: new Date(2021, 7, 3), score: 62 },
      { date: new Date(2021, 7, 4), score: 62 },
      { date: new Date(2021, 7, 5), score: 62 },
      { date: new Date(2021, 7, 6), score: 62 },
      { date: new Date(2021, 7, 7), score: 73 },
    ];

    assert({
      given: 'state and duration',
      should: 'return daily scores',
      actual,
      expected
    });
  }
});

describe('rejectionsReducer/getVisibleRejections', async assert => {
  const actions = [
    addQuestion({ 
      question: 'Can I have a raise?',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 6, 14)
    }),
    addQuestion({ 
      question: 'Can you buy me a burger??',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 6, 15)
    }),
    addQuestion({ 
      question: 'Can I take some time to grab my wallet?',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 6, 21)
    }),
    addQuestion({ 
      question: 'Can I have a raise again?',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 6, 26)
    }),
    addQuestion({ 
      question: 'Can I have a raise this time?',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 6, 27)
    }),
    addQuestion({ 
      question: 'Can I have a job?',
      askee: 'Boss',
      status: "Accepted",
      timestamp: new Date(2021, 6, 27)
    }),
    addQuestion({ 
      question: 'Can I have a job again?',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 6, 28)
    }),
    addQuestion({ 
      question: 'Can I have a job this time?',
      askee: 'Boss',
      status: "Accepted",
      timestamp: new Date(2021, 7, 1)
    }),
    addQuestion({ 
      question: 'Can you buy me lunch?',
      askee: 'Boss',
      status: "Accepted",
      timestamp: new Date(2021, 7, 7)
    }),
    addQuestion({ 
      question: 'Can you buy me dinner?',
      askee: 'Boss',
      status: "Rejected",
      timestamp: new Date(2021, 7, 7)
    })
  ];

  const state = { rejections: actions.reduce(rejectionsReducer, []) };

  {
    const filter = showAll();

    const actual = getVisibleRejections(state, filter);

    const expected = [
      { 
        question: 'Can I have a raise?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 14)
      },
      { 
        question: 'Can you buy me a burger??',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 15)
      },
      { 
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 21)
      },
      { 
        question: 'Can I have a raise again?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 26)
      },
      { 
        question: 'Can I have a raise this time?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 27)
      },
      { 
        question: 'Can I have a job?',
        askee: 'Boss',
        status: "Accepted",
        id: '',
        timestamp: new Date(2021, 6, 27)
      },
      { 
        question: 'Can I have a job again?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 28)
      },
      { 
        question: 'Can I have a job this time?',
        askee: 'Boss',
        status: "Accepted",
        id: '',
        timestamp: new Date(2021, 7, 1)
      },
      { 
        question: 'Can you buy me lunch?',
        askee: 'Boss',
        status: "Accepted",
        id: '',
        timestamp: new Date(2021, 7, 7)
      },
      { 
        question: 'Can you buy me dinner?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 7, 7)
      }
    ];

    assert({
      given: 'state and showAll() filter',
      should: 'return state',
      actual,
      expected
    });
  }

  {
    const filter = showRejected();

    const actual = getVisibleRejections(state, filter);

    const expected = [
      { 
        question: 'Can I have a raise?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 14)
      },
      { 
        question: 'Can you buy me a burger??',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 15)
      },
      { 
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 21)
      },
      { 
        question: 'Can I have a raise again?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 26)
      },
      { 
        question: 'Can I have a raise this time?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 27)
      },
      { 
        question: 'Can I have a job again?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 6, 28)
      },
      { 
        question: 'Can you buy me dinner?',
        askee: 'Boss',
        status: "Rejected",
        id: '',
        timestamp: new Date(2021, 7, 7)
      }
    ];

    assert({
      given: 'state and showRejected() filter',
      should: 'return rejected questions',
      actual,
      expected
    });
  }

  {
    const filter = showAccepted();

    const actual = getVisibleRejections(state, filter);

    const expected = [
      { 
        question: 'Can I have a job?',
        askee: 'Boss',
        status: "Accepted",
        id: '',
        timestamp: new Date(2021, 6, 27)
      },
      { 
        question: 'Can I have a job this time?',
        askee: 'Boss',
        status: "Accepted",
        id: '',
        timestamp: new Date(2021, 7, 1)
      },
      { 
        question: 'Can you buy me lunch?',
        askee: 'Boss',
        status: "Accepted",
        id: '',
        timestamp: new Date(2021, 7, 7)
      }
    ];

    assert({
      given: 'state and showAccepted() filter',
      should: 'return accepted questions',
      actual,
      expected
    });
  }
});