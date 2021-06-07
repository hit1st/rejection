// import Rejection from '../src/features/rejection/index.js';

// const 

// export default Rejection;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
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

const store = createStore(reducer);

const RejectionsApp = ({ score, rejections, rejection }) => {
  const [question, setQuestion] = useState('');
  const [askee, setAskee] = useState('');
  const handleQuestionChange = (event) => {
    event.preventDefault();
    setQuestion(event.target.value);
  };
  const handleAskeeChange = (event) => {
    event.preventDefault();
    setAskee(event.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const input = e.target.outerText === 'Accepted' ? 
      { question, askee, status: 'Accepted' } :
      { question, askee, status: 'Rejected' };
    rejection(input);
    setQuestion('');
    setAskee('');
  };

  return (
    <>
      <h1>Score: {score}</h1>
      <h3>Question</h3>
      <input onChange={handleQuestionChange} value={question} />
      <h3>Askee</h3>
      <input onChange={handleAskeeChange} value={askee} />
      <button onClick={handleClick}>Accepted</button>
      <button onClick={handleClick}>Rejected</button>
      <ul>
        {rejections.map(rejection => 
          <li key={rejection.id}>
            <p>Question: {rejection.question}</p>
            <p>Askee: {rejection.askee}</p>
            <p>Status: {rejection.status}</p>
          </li>
        )}
      </ul>
    </>
  );
};
const render = () => {
  ReactDOM.render(<RejectionsApp
    score={getScore(store.getState())}
    rejections={store.getState()}
    rejection={({ question, askee, status }) => store.dispatch(addQuestion({
      question,
      askee,
      status
    }))}
  />, document.getElementById('root'));
};

store.subscribe(render);
render();