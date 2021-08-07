import { DayOfMonth } from 'faunadb';
import { describe } from 'riteway';

import { dateMaker, daysBeforeDate, daysForTheWeek } from './line-chart.js';

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

// [
//   {status: "Rejected", timestamp: "2021-07-14"},
//   {status: "Rejected", timestamp: "2021-07-15"},
//   {status: "Rejected", timestamp: "2021-07-21"},
//   {status: "Rejected", timestamp: "2021-07-26"},
//   {status: "Rejected", timestamp: "2021-07-27"},
//   {status: "Accepted", timestamp: "2021-07-27"},
//   {status: "Rejected", timestamp: "2021-07-28"}
// ]