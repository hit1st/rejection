import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '../link/link.js';

const FilterLink = ({
  filter,
  children
}) => {
  const { visibilityFilter } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <Link
      active={
        filter === visibilityFilter
      }
      onClick={() => 
        dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
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
