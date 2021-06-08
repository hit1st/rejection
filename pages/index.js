import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import RejectionsApp from '../src/features/rejections-app/rejections-app.js';
import { reducer, getScore, addQuestion } from '../src/features/rejection/rejection-reducer.js';
import store from '../src/features/rejections-app/store.js';
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
};

const VisibleRejectionsList = () => {
  const { rejections, visibilityFilter } = useSelector(state => state);

  return (
    <RejectionsList
      rejections={
        getVisibleRejections(
          rejections,
          visibilityFilter
        )
      }
    /> 
  )
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

const rejectionsApp = combineReducers({
  rejections: reducer,
  visibilityFilter: visibilityFilter
});

// const store = createStore(rejectionsApp);

// const RejectionsApp = () => (
//   <>
//     <Score />
//     <AddRejection />
//     <RejectionsVisibility />
//     <VisibleRejectionsList />
//   </>
// );


ReactDOM.render(
<Provider store={store}>
  <RejectionsApp />
</Provider>,
document.getElementById('root'));
