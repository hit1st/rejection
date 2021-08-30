import React, { Fragment } from 'react';

import FilterLink from '../filter-link/filter-link.js';
import {
  getVisibilityFilter,
  setVisibilityFilter,
  showAll,
  showAccepted,
  showRejected
} from '../visibility/visibility-filter.js';

const RejectionsVisibilityBar = props => {
  const links = [
    { text: 'All', filter: showAll() },
    { text: 'Accepted', filter: showAccepted() },
    { text: 'Rejected', filter: showRejected() },
  ].map(({ text, filter }) => (
    <Fragment key={text}>
      {' '}
      <FilterLink
        filter={filter}
        selector={getVisibilityFilter}
        actionCreator={setVisibilityFilter}
        {...props}
      >
        {text}
      </FilterLink>
    </Fragment>
  ));

  return (
    <p>
      Show:
      {links}
    </p>
  )
};

export default RejectionsVisibilityBar;
