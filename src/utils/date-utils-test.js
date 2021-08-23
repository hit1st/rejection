import { describe } from 'riteway';

import { getDaysForTheWeek } from './date-utils.js';

describe('date-utils/getDaysForTheWeek', async assert => {
  {
    const date = new Date(2021, 7, 5);
    const expected = [];

    for (let i = 6; i > -1; i -= 1) {
      expected.push(new Date(2021, 7, 5 - i));
    }

    assert({
      given: 'a date',
      should: 'return dates of date and past six days',
      actual: getDaysForTheWeek(date),
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
      actual: getDaysForTheWeek(),
      expected
    });
  }
});
