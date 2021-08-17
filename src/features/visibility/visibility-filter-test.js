import { describe } from 'riteway';
import visibilityFilter, { getVisibilityFilter, setVisibilityFilter } from './visibility-filter.js';

describe('getVisibilityFilter/visibilityFilter', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: getVisibilityFilter({ visibilityFilter: visibilityFilter() }),
    expected: 'SHOW_ALL'
  });
});

describe('getVisibilityFilter/visibilityFilter/setVisibilityFilter', async assert => {
  const filter = 'SHOW_ACCEPTED';
  const actual = getVisibilityFilter({
    visibilityFilter: visibilityFilter(visibilityFilter(), setVisibilityFilter(filter))
  });

  assert({
    given: 'a state and action creator',
    should: 'change state',
    actual,
    expected: filter
  });
});
