import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import Button from './button.js';

// can't unit test for onClick, need to use integration tests
describe('Button component', async assert => {
  const createButton = props => render(<Button {...props} />);

  {
    const $ = render(<Button />);

    assert({
      given: 'no arguments',
      should: 'render a button',
      actual: $('button').length,
      expected: 1
    });
  }

  {
    const props = {
      buttonClass: 'the-button',
      label: 'This is a button',
      handleClick: e => {
        e.prevenDefault();
        return 'fired';
      }
    };
    const $ = createButton(props);

    assert({
      given: 'buttonClass string',
      should: 'render button with class buttonClass string',
      actual: $(`.${props.buttonClass}`)['0'].name,
      expected: 'button'
    });
  }

  {
    const props = {
      buttonClass: 'the-button',
      label: 'This is a button',
      handleClick: e => {
        e.prevenDefault();
        return 'fired';
      }
    };
    const $ = createButton(props);
    const contains = match($(`.${props.buttonClass}`).html())

    assert({
      given: 'label string',
      should: 'render correct button text',
      actual: contains(props.label),
      expected: props.label
    });
  }
});
