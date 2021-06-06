// import Rejection from '../src/features/rejection/index.js';

// const 

// export default Rejection;
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Rejections from '../src/features/rejections-component/rejections.js';
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

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(<Rejections
    score={getScore(store.getState())}
    rejections={store.getState()}
    accepted={() => store.dispatch(addQuestion({
      question: 'Did it work?',
      askee: 'V8',
      status: 'Accepted'
    }))}
    rejected={() => store.dispatch(addQuestion({
      question: 'Did it work?',
      askee: 'V8',
      status: 'Rejected'
    }))}
  />, document.getElementById('root'));
};

store.subscribe(render);
render();