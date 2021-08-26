import { describe } from 'riteway';

import rejectionsReducer,
{ 
  addQuestion,
  getRejections,
  getScore,
  addFetchedQuestions,
  getDailyScoresForTheDuration
} from './rejection-reducer.js';

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
        timestamp: (new Date(2021, 6, 14)).toString()
      }),
      addQuestion({ 
        question: 'Can you buy me a burger??',
        askee: 'Boss',
        status: "Rejected",
        timestamp: (new Date(2021, 6, 15)).toString()
      }),
      addQuestion({ 
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: (new Date(2021, 6, 21)).toString()
      }),
      addQuestion({ 
        question: 'Can I have a raise again?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: (new Date(2021, 6, 26)).toString()
      }),
      addQuestion({ 
        question: 'Can I have a raise this time?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: (new Date(2021, 6, 27)).toString()
      }),
      addQuestion({ 
        question: 'Can I have a job?',
        askee: 'Boss',
        status: "Accepted",
        timestamp: (new Date(2021, 6, 27)).toString()
      }),
      addQuestion({ 
        question: 'Can I have a job again?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: (new Date(2021, 6, 28)).toString()
      }),
      addQuestion({ 
        question: 'Can I have a job this time?',
        askee: 'Boss',
        status: "Accepted",
        timestamp: (new Date(2021, 7, 1)).toString()
      }),
      addQuestion({ 
        question: 'Can you buy me lunch?',
        askee: 'Boss',
        status: "Accepted",
        timestamp: (new Date(2021, 7, 7)).toString()
      }),
      addQuestion({ 
        question: 'Can you buy me dinner?',
        askee: 'Boss',
        status: "Rejected",
        timestamp: (new Date(2021, 7, 7)).toString()
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