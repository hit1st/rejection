import { describe } from 'riteway';

import isLoadingReducer from './is-loading-reducer.js'

describe('isLoading', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: isLoadingReducer(),
    expect: true
  });
});
