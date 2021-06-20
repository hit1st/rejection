import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RejectionsApp from '../src/features/rejections-app/rejections-app.js';
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


ReactDOM.render(
  <Provider store={store}>
    <RejectionsApp />
  </Provider>,
  document.getElementById('root')
);
