import { describe } from 'riteway';
import visibilityFilter, {
  getVisibilityFilter,
  setVisibilityFilter,
  showAll,
  showAccepted,
} from './visibility-filter.js';

describe('getVisibilityFilter/visibilityFilter', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: getVisibilityFilter({ visibilityFilter: visibilityFilter() }),
    expected: showAll()
  });
});

describe('getVisibilityFilter/visibilityFilter/setVisibilityFilter', async assert => {
  const filter = showAccepted();
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
