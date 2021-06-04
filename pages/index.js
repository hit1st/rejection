// import Rejection from '../src/features/rejection/index.js';

// const 

// export default Rejection;

import { reducer, addQuestion, getScore } from '../src/features/rejection/rejection-reducer.js';
import { storeQuestions, getStoredQuestions } from '../src/features/stored-questions/stored-questions.js';
import getFormValues from '../src/features/form-values/form-values.js';

const processInput = () => {
  const prevState = getStoredQuestions() || reducer();
  const state = reducer(prevState, addQuestion(getFormValues()));
  storeQuestions(state);

  const myStorage = window.localStorage;
  console.log('new store: ', JSON.parse(myStorage.getItem('questions')))
};

window.processInput = processInput;

export default processInput;