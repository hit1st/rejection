import { describe } from 'riteway';

import { getID, idReducer, updateID } from './id-reducer.js';

describe('getID/idReducer/updateID', async assert => {
  assert({
    given: 'no arguments',
    should: 'return valid initial state',
    actual: getID({ id: idReducer() }),
    expected: '',
  });

  {
    const id = 'IamAnID';

    assert({
      given: 'a new id',
      should: 'update state',
      actual: getID({ id: idReducer(idReducer(), updateID({ id })) }),
      expected: id
    });
  }
});