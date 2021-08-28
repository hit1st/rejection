import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '../link/link.js';

const FilterLink = ({
  filter,
  selector,
  actionCreator,
  children,
  visibility,
  dispatch = useDispatch(),
}) => {
  const visibilityFilter = visibility || useSelector(selector);
  return (
    <Link
      active={
        filter === visibilityFilter
      }
      onClick={
        () => dispatch(actionCreator(filter))
      }
    >
      {children}
    </Link>
  );
};

export default FilterLink;
