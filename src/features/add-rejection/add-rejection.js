import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../rejection/rejection-reducer.js';

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
      <h2>Question</h2>
      <input ref={node => {
        question = node;
      }} />
      <h2>Askee</h2>
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

export default AddRejection;
