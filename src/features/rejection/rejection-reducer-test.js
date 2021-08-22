import { describe } from 'riteway';

import rejectionsReducer,
{ 
  addQuestion,
  getRejections,
  getScore,
  addFetchedQuestions,
  getDailyScoresForTheDuration
} from './rejection-reducer.js';
import { dateMaker } from "../../utils/date-utils";

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
      '2021-08-01',
      '2021-08-02',
      '2021-08-03',
      '2021-08-04',
      '2021-08-05',
      '2021-08-06',
      '2021-08-07'
    ];

    const actual = getDailyScoresForTheDuration(state, duration);

    const expected = [
      { date: "2021-08-01", score: 62 },
      { date: "2021-08-02", score: 62 },
      { date: "2021-08-03", score: 62 },
      { date: "2021-08-04", score: 62 },
      { date: "2021-08-05", score: 62 },
      { date: "2021-08-06", score: 62 },
      { date: "2021-08-07", score: 73 },
    ]

    assert({
      given: 'state and duration',
      should: 'return daily scores',
      actual,
      expected
    });
  }
});