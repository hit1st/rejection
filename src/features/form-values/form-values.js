import { reducer, addQuestion, getScore } from '../rejection/rejection-reducer.js';
import { storeQuestions, getStoredQuestions } from '../stored-questions/stored-questions.js';

const getFormValues = () => {
  console.log('names: ', document.getElementsByName('status'));
  const question = document.getElementById('question');
  const askee = document.getElementById('askee');
  const status = document.getElementsByName('status').reduce((status, radio) => {
      return radio.checked ? radio.value : status;
  });
  return {
    question,
    askee,
    status
  };
};

export default getFormValues;