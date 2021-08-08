import { DayOfMonth } from 'faunadb';
import { describe } from 'riteway';

import { dateMaker, daysBeforeDate, daysForTheWeek, getDailyScoreForTheDuration } from './line-chart.js';

describe('dateMaker', async assert => {
  {
    const date = new Date(2021, 7, 1);
    const expected = `2021-08-01`;
    

    assert({
      given: 'a date',
      should: 'return a formatted date',
      actual: dateMaker(date),
      expected 
    })
  }
});

describe('daysBeforeDate', async assert => {
  assert({
    given: 'no arguments',
    should: 'return new Date object',
    actual: daysBeforeDate()(),
    expected: new Date()
  });

  const dayOfMonth = 6;
  const daysBefore = daysBeforeDate(new Date(2021, 7, dayOfMonth));

  {
    const expected = new Date(2021, 7, dayOfMonth - 2);

    assert({
      given: 'date and 2 days before date',
      should: 'return date object 2 days before date',
      actual: daysBefore(2),
      expected
    });
  }

  {
    const expected = new Date(2021, 7, dayOfMonth - 3);

    assert({
      given: 'date and 3 days before date',
      should: 'return date object 3 days before date',
      actual: daysBefore(3),
      expected
    });
  }
});

describe('daysForTheWeek', async assert => {
  {
    const date = new Date(2021, 7, 5);
    const expected = [];

    for (let i = 6; i > -1; i -= 1) {
      expected.push(new Date(2021, 7, 5 - i));
    }

    assert({
      given: 'a date',
      should: 'return dates of date and past six days',
      actual: daysForTheWeek(date),
      expected
    });
  }

  {
    const date = new Date();
    const expected = [];

    for (let i = 6; i > -1; i -= 1) {
      expected.push(new Date((new Date(date.getFullYear(), date.getMonth(), date.getDate() - i))));
    }

    assert({
      given: 'no arguments',
      should: 'return dates of the past week',
      actual: daysForTheWeek(),
      expected
    });
  }
});

describe('getDailyScoreForTheDuration', async assert => {
  assert({
    given: 'no arguments',
    should: 'return default scores',
    actual: getDailyScoreForTheDuration(),
    expected: []
  });

  {
    const rejections = [
      { status: "Rejected", timestamp: { value: "2021-07-14" } },
      { status: "Rejected", timestamp: { value: "2021-07-15" } },
      { status: "Rejected", timestamp: { value: "2021-07-21" } },
      { status: "Rejected", timestamp: { value: "2021-07-26" } },
      { status: "Rejected", timestamp: { value: "2021-07-27" } },
      { status: "Accepted", timestamp: { value: "2021-07-27" } },
      { status: "Rejected", timestamp: { value: "2021-07-28" } },
      { status: "Accepted", timestamp: { value: "2021-08-01" } },
      { status: "Accepted", timestamp: { value: "2021-08-07" } }
    ];

    const duration = [
      '2021-08-01',
      '2021-08-02',
      '2021-08-03',
      '2021-08-04',
      '2021-08-05',
      '2021-08-06',
      '2021-08-07'
    ];

    const actual = getDailyScoreForTheDuration(rejections, duration);

    const expected = [
      { date: "2021-08-01", score: 62 },
      { date: "2021-08-02", score: 62 },
      { date: "2021-08-03", score: 62 },
      { date: "2021-08-04", score: 62 },
      { date: "2021-08-05", score: 62 },
      { date: "2021-08-06", score: 62 },
      { date: "2021-08-07", score: 63 },
    ]

    assert({
      given: 'rejections and duration',
      should: 'return daily scores',
      actual,
      expected
    });
  }
});
