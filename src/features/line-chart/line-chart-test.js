import { describe } from 'riteway';

import { dateMaker } from './line-chart.js';

describe('dateMaker', async assert => {
  {
    const date = new Date();
    const expected = `2021-08-01`;
    

    assert({
      given: 'a date',
      should: 'should return a formatted date',
      actual: dateMaker(date),
      expected 
    })
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