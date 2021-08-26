import { describe } from 'riteway';

import isLoadingReducer,
  { isNotLoading, isLoading, getIsLoading } from './is-loading-reducer.js'

describe('isLoadingReducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: getIsLoading({ isLoading: isLoadingReducer() }),
    expected: true
  });
});

describe('isLoadingReducer/isNotLoading', async assert => {
  assert({
    given: 'data has finished loading',
    should: 'return updated state',
    actual: getIsLoading({ isLoading: isLoadingReducer(isLoadingReducer(), isNotLoading()) }),
    expected: false
  });
});

describe('isLoadingReducer/isLoading', async assert => {
  const state = false;

  assert({
    given: 'data is loading',
    should: 'return updated state',
    actual: getIsLoading({ isLoading: isLoadingReducer(state, isLoading()) }),
    expected: true
  });
});
