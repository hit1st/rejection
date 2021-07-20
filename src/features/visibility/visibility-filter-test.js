import { describe } from 'riteway';
import visibilityFilter, { getVisibilityFilter, setVisibilityFilter } from './visibility-filter.js';

describe('getVisibilityFilter', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: getVisibilityFilter(),
    expected: undefined
  });

  {
    const state = {}

    assert({
      given: 'invalid state',
      should: 'return undefined',
      actual: getVisibilityFilter(state),
      expected: undefined
    });
  }

  {
    const state = {
      visibilityFilter: 'SHOW_ALL'
    }

    assert({
      given: 'valid state',
      should: 'return valid visibilityFilter value',
      actual: getVisibilityFilter(state),
      expected: state.visibilityFilter
    });
  }
});

describe('setVisibilityFilter', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: setVisibilityFilter(),
    expected: undefined
  });

  { 
    const filter = 'SHOW_ALL';
    const expected = {
      type: 'SET_VISIBILITY_FILTER',
      filter
    };

    assert({
      given: 'an argument',
      should: 'return action object',
      actual: setVisibilityFilter(filter),
      expected
    });
  }
});

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
