import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import 
  Input,
  {
    inputReducer,
    updateInput,
    clearInput
  } from './input.js';

describe('input/updateInput', async assert => {
  {
    const expected = {
      type: 'ADD_REJECTION::UPDATE_INPUT',
      payload: ''
    };

    assert({
      given: 'no arguments',
      should: 'return an action object',
      actual: updateInput(),
      expected
    });
  }

  {
    const value = 'Can I have a raise?';
    const expected = {
      type: 'ADD_REJECTION::UPDATE_INPUT',
      payload: value
    };

    assert({
      given: 'a new input',
      should: 'return an action object',
      actual: updateInput(value),
      expected
    });
  }
});

describe('input/clearInput', async assert => {
  assert({
    given: 'no arguments',
    should: 'return action object',
    actual: clearInput()(),
    expected: {
      name: undefined,
      type: 'ADD_REJECTION::CLEAR_INPUT'
    }
  })
});

describe('inputReducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    actual: inputReducer(),
    expected: ''
  });

  {
    const value = 'Can I have a raise?';

    assert({
      given: 'a new value',
      should: 'update state',
      actual: inputReducer(inputReducer(), updateInput(value)),
      expected: value
    });
  }

  {
    const state = 'not empty string';

    assert({
      given: 'state and clearInput action',
      should: 'return an empty string',
      actual: inputReducer(state, clearInput()()),
      expected: ''
    });
  }
});


describe('Input component', async assert => {
  const createInput = ({ 
    headerValue,
    inputValue,
    inputClass,
    onChangeHandler
  }) => {
    return render(<Input
      header={headerValue}
      value={inputValue}
      inputClass={inputClass}
      onChangeHandler={onChangeHandler}
    />)
  };

  {
    const $ = render(<Input />);

    assert({
      given: 'no arguments',
      should: 'render nothing.',
      actual: $('body').html(),
      expected: ''
    });
  }

  {
    const inputValue = 'str';
    const onChangeHandler = () => {};
    const $ = createInput({ inputValue, onChangeHandler });

    assert({
      given: 'no headerValue argument',
      should: 'render nothing.',
      actual: $('body').html(),
      expected: ''
    });
  }

  {
    const headerValue = 'Name';
    const inputValue = 'str';
    const $ = createInput({ headerValue, inputValue });

    assert({
      given: 'no onChangeHandler argument',
      should: 'render nothing.',
      actual: $('body').html(),
      expected: ''
    });
  }

  {
    const values = {
      headerValue: 'Name',
      inputValue: 'str',
      onChangeHandler: () => {}
    };
    const $ = createInput(values);
    const contains = match($('.input-header').html());

    assert({
      given: 'a header argument',
      should: 'render the correct header text.',
      actual: contains(values.headerValue),
      expected: values.headerValue
    });
  }

  {
    const values = {
      headerValue: 'Name',
      inputValue: 'str',
      inputClass: 'the-input',
      onChangeHandler: () => {}
    };
    const $ = createInput(values);

    assert({
      given: 'an inputClass string',
      should: 'render input with inputClass string',
      actual: $(`.${values.inputClass}`)['0'].name,
      expected: 'input'
    });
  }

  {
    const values = {
      headerValue: 'Name',
      inputValue: 'str',
      onChangeHandler: () => {}
    };
    const $ = createInput(values);

    assert({
      given: 'an input value',
      should: 'render the correct input text.',
      actual: $('input').val(),
      expected: values.inputValue
    });
  }

});