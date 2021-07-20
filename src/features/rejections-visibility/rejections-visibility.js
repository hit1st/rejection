import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '../link/link.js';
import { getVisibilityFilter, setVisibilityFilter } from '../visibility/visibility-filter.js';

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
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {'  '}
    <FilterLink
      filter='SHOW_ACCEPTED'
    >
      Accepted
    </FilterLink>
    {'  '}
    <FilterLink
      filter='SHOW_REJECTED'
    >
      Rejected
    </FilterLink>
  </p>
);

export default RejectionsVisibility;
