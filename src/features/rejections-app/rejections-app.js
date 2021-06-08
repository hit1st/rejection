import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getScore, addQuestion } from '../rejection/rejection-reducer.js';
import VisibleRejectionsList from '../rejections-list/rejections-list.js';

const AddRejection = () => {
  const dispatch = useDispatch();
  let question;
  let askee;
  const handleClick = e => {
    e.preventDefault();
    dispatch(addQuestion({
      question: question.value,
      askee: askee.value,
      status: e.target.outerText
    }));
    question.value = '';
    askee.value = '';
  };

  return (
    <>
      <h3>Question</h3>
      <input ref={node => {
        question = node;
      }} />
      <h3>Askee</h3>
      <input ref={node => {
        askee = node;
      }} />
      <div>
        <button onClick={handleClick}>Accepted</button>
        <button onClick={handleClick}>Rejected</button>
      </div>
    </>
  );
};

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

const Score = () => {
  const { rejections } = useSelector(state => state);

  return (
    <h1>Score: {getScore(rejections)}</h1>
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
