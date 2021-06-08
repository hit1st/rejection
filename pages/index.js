// import Rejection from '../src/features/rejection/index.js';

// const 

// export default Rejection;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// import RejectionsApp from '../src/features/rejections-app/rejections-app.js';
import { reducer, getScore, addQuestion } from '../src/features/rejection/rejection-reducer.js';
// import { storeQuestions, getStoredQuestions } from '../src/features/stored-questions/stored-questions.js';
// import getFormValues from '../src/features/form-values/form-values.js';

// const processInput = () => {
//   const prevState = getStoredQuestions() || reducer();
//   const state = reducer(prevState, addQuestion(getFormValues()));
//   storeQuestions(state);

//   const myStorage = window.localStorage;
//   console.log('new store: ', JSON.parse(myStorage.getItem('questions')))
// };

// window.processInput = processInput;

// export default processInput;

const Rejection = ({
  question,
  askee,
  status
}) => {
  return (
    <li>
      <p>Question: {question}</p>
      <p>Askee: {askee}</p>
      <p>Status: {status}</p>
    </li>
  );
};

const RejectionsList = ({
  rejections
}) => (
  <ul>
    {rejections.map(rejection => 
      <Rejection
        key={rejection.id}
        {...rejection}
      />)}
  </ul>
);

const AddRejection = ({
  onAddClick
}) => {
  let question;
  let askee;
  const handleClick = e => {
    e.preventDefault();
    onAddClick({
      question: question.value,
      askee: askee.value,
      status: e.target.outerText
    });
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

const FilterLink = ({
  filter,
  children
}) => {
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    >
      {children}
    </a>
  )
};

const getVisibleRejections = (
  rejections,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return rejections;
    case 'SHOW_ACCEPTED':
      return rejections.filter(rejection => rejection.status === 'Accepted');
    case 'SHOW_REJECTED':
      return rejections.filter(rejection => rejection.status === 'Rejected');
  };
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}
const rejectionsApp = combineReducers({
  rejections: reducer,
  visibilityFilter: visibilityFilter
});

const Score = ({ rejections }) => <h1>Score: {getScore(rejections)}</h1>;

const VisibleRejections = () => (
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

const store = createStore(rejectionsApp);

const RejectionsApp = ({ rejections, addRejection, visibilityFilter }) => (
  <>
    <Score rejections={rejections} />
    <AddRejection onAddClick={addRejection} />
    <VisibleRejections />
    <RejectionsList rejections={getVisibleRejections(rejections, visibilityFilter)} />
  </>
);


const render = () => {
  ReactDOM.render(<RejectionsApp
    {...store.getState()}
    addRejection={({ question, askee, status }) => store.dispatch(addQuestion({
      question,
      askee,
      status
    }))}

  />, document.getElementById('root'));
};

store.subscribe(render);
render();