import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import createHeadingComponent from './create-heading-component.js';

describe('createHeadingComponent', async assert => {
  {
    const header = 'header';
    const HeaderComponent = createHeadingComponent()();
    const $ = render(<HeaderComponent />);
    const contains = match($(`.${header}`).html());

    assert({
      given: 'no arguments',
      should: 'return a component',
      actual: contains(header),
      expected: header
    });
  }
  
  {
    const header = 'header';
    const HeaderComponent = createHeadingComponent('h3')();
    const value = 'Hello, this is a header component!'
    const $ = render(<HeaderComponent />);
    const contains = match($(`.${header}`).html());

    assert({
      given: 'no value prop',
      should: 'return a component',
      actual: contains(value),
      expected: value
    });
  }

  {
    const header = 'Score';
    const ScoreComponent = createHeadingComponent('h3')('Score');
    const $ = render(<ScoreComponent />);
    const contains = match($(`.${header.toLowerCase()}`).html());

    assert({
      given: 'a header title argument',
      should: 'return a component with correct header',
      actual: contains(header),
      expected: header
    });
  }

  {
    const header = 'header';
    const HeaderComponent = createHeadingComponent('h2')();
    const value = '10';
    const $ = render(<HeaderComponent value={value} />);
    const contains = match($(`.${header}`).html());

    assert({
      given: 'a value prop',
      should: 'return a component with correct value prop',
      actual: contains(value),
      expected: value
    });
  }
});
