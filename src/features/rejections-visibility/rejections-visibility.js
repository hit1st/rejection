import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '../link/link.js';
import {
  getVisibilityFilter,
  setVisibilityFilter,
  showAll,
  showAccepted,
  showRejected
} from '../visibility/visibility-filter.js';

const FilterLink = ({
  filter,
  children
}) => {
  const visibilityFilter = useSelector(getVisibilityFilter);
  const dispatch = useDispatch();
  return (
    <Link
      active={
        filter === visibilityFilter
      }
      onClick={
        () => dispatch(setVisibilityFilter(filter))
      }
    >
      {children}
    </Link>
  );
};

const RejectionsVisibility = () => (
  <p>
    Show:
    {'  '}
    <FilterLink
      filter={showAll()}
    >
      All
    </FilterLink>
    {'  '}
    <FilterLink
      filter={showAccepted()}
    >
      Accepted
    </FilterLink>
    {'  '}
    <FilterLink
      filter={showRejected()}
    >
      Rejected
    </FilterLink>
  </p>
);

export default RejectionsVisibility;
