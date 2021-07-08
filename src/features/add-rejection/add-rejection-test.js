import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import { Input } from './input.js';

describe('Input component', async assert => {
  const createInput = ({ 
    headerValue,
    inputValue,
    onChangeHandler
  }) => {
    return render(<Input
      header={headerValue}
      value={inputValue}
      onChangeHandler={onChangeHandler}
    />)
  };

  {
    const $ = render(<Input />);

    assert({
      given: 'no arguments',
      should: 'render no header.',
      actual: $('h3').html(),
      expected: null
    });
  }

  {
    const headerValue = 'Name';
    const $ = createInput({ headerValue, inputValue: 'str' });
    const contains = match($('.input-header').html());

    assert({
      given: 'a header value',
      should: 'render the correct header text.',
      actual: contains(headerValue),
      expected: headerValue
    });
  }

  {
    const inputValue = 'str';
    const $ = createInput({ inputValue });

    assert({
      given: 'an input value',
      should: 'render the correct input text.',
      actual: $('input').val(),
      expected: inputValue
    });
  }
});