import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Score from '../score/score.js';
import AddRejection from '../add-rejection/add-rejection.js';
import VisibleRejectionsList from '../rejections-list/rejections-list.js';

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) return <span>{children}</span>;
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  )
};

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

const RejectionsApp = () => (
  <>
    <Score />
    <AddRejection />
    <RejectionsVisibility />
    <VisibleRejectionsList />
  </>
);

export default RejectionsApp;
