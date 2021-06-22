import { describe } from 'riteway';

import { addPropsToPayload } from './add-props-to-payload.js';

describe('addPropsToPayload', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: addPropsToPayload(),
    expected: undefined,
  });

  assert({
    given: 'an argument is not an object',
    should: 'return undefined',
    actual: addPropsToPayload('hello'),
    expected: undefined,
  });

  assert({
    given: 'an argument',
    should: 'return a function',
    actual: typeof addPropsToPayload({ id: '12345', timestamp: '12345' }),
    expected: 'function',
  });
});

describe('addPropsToPayload return function', async assert => {
  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: addPropsToPayload({ id: '12345', timestamp: '12345' })(),
    expected: undefined,
  });

  assert({
    given: 'an argument is not an object',
    should: 'return undefined',
    actual: addPropsToPayload({ id: '12345', timestamp: '12345' })('hello'),
    expected: undefined,
  });

  {
    const originalProps = {
      type: 'TEST',
      payload: {
        question: 'Can we play a game',
        askee: 'Matthew',
        status: 'Rejected'
      }
    };

    const { payload } = originalProps;

    const newProps = {
      id: '12345',
      timestamp: '12345'
    };

    assert({
      given: 'an argument',
      should: 'return a new object with concatenated properties',
      actual: addPropsToPayload(newProps)(originalProps),
      expected: { ...originalProps, payload: { ...payload, ...newProps } },
    });
  }
});
