import { describe } from 'riteway';

import { idReducer, updateID } from './id-reducer.js';

describe('idReducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return valid initial state',
    actual: idReducer(),
    expected: '',
  });

  {
    const id = 'IamAnID';

    assert({
      given: 'a new id',
      should: 'update state',
      actual: idReducer(idReducer(), updateID({ id })),
      expected: id
    });
  }
});