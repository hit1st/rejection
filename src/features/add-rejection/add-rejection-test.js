import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import { AddRejection } from './add-rejection.js';

describe ('AddRejection component', async assert => {
  const createAddRejection = props => render(<AddRejection {...props} />);

  {
    const $ = createAddRejection();

    assert({
      given: 'no arguments',
      should: 'not render',
      actual: $('.add-question').html(),
      expected: null
    });
  }

  {
    const props = {
      askee: '',
      handleInputClick: () => {},
      handleClearClick: () => {},
      questionOnChangeHandler: () => {},
      askeeOnChangeHandler: () => {}
    }
    const $ = createAddRejection(props);

    assert({
      given: 'missing question prop',
      should: 'not render',
      actual: $('.add-question').html(),
      expected: null
    });
  }

  {
    const props = {
      question: '',
      handleInputClick: () => {},
      handleClearClick: () => {},
      questionOnChangeHandler: () => {},
      askeeOnChangeHandler: () => {}
    }
    const $ = createAddRejection(props);

    assert({
      given: 'missing askee prop',
      should: 'not render',
      actual: $('.add-question').html(),
      expected: null
    });
  }
  
  {
    const props = {
      question: '',
      askee: '',
      handleClearClick: () => {},
      questionOnChangeHandler: () => {},
      askeeOnChangeHandler: () => {}
    }
    const $ = createAddRejection(props);

    assert({
      given: 'missing handleInputClick prop',
      should: 'not render',
      actual: $('.add-question').html(),
      expected: null
    });
  }

  {
    const props = {
      question: '',
      askee: '',
      handleInputClick: () => {},
      handleClearClick: () => {},
      askeeOnChangeHandler: () => {}
    }
    const $ = createAddRejection(props);

    assert({
      given: 'missing questionOnChangeHandler prop',
      should: 'not render',
      actual: $('.add-question').html(),
      expected: null
    });
  }

  {
    const props = {
      question: '',
      askee: '',
      handleInputClick: () => {},
      handleClearClick: () => {},
      questionOnChangeHandler: () => {}
    }
    const $ = createAddRejection(props);

    assert({
      given: 'missing askeeOnChangeHandler prop',
      should: 'not render',
      actual: $('.add-question').html(),
      expected: null
    });
  }

  {
    const props = {
      question: '',
      askee: '',
      handleInputClick: () => {},
      handleClearClick: () => {},
      questionOnChangeHandler: () => {},
      askeeOnChangeHandler: () => {}
    }
    const $ = createAddRejection(props);

    assert({
      given: 'required props',
      should: 'render AddRejection',
      actual: $('.add-question').length,
      expected: 1
    });
  }
});
