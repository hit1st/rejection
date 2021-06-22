import { describe } from 'riteway';

import visibilityFilter from './visibility-filter.js';


describe('visibilityFilter', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: visibilityFilter(),
    expected: 'SHOW_ALL'
  });

  {
    const action = {
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_ACCEPTED'
    };

    assert({
      given: 'a new action',
      should: 'change state',
      actual: visibilityFilter(visibilityFilter(), action),
      expected: action.filter
    });
  }
});
