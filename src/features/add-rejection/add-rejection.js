import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuestion } from '../faunadb-sagas/faunadb-sagas.js';
import Input from '../input/input.js';
import Button from '../button/button.js';

const AddRejection = ({
  question,
  askee,
  handleInputClick,
  questionChangeHandler,
  askeeChangeHandler
}) => [
    handleInputClick,
    questionChangeHandler,
    askeeChangeHandler,
    question,
    askee
  ].every(prop => prop !== undefined) ?
  (
    <div className={'add-question'}>
      <Input
        header={'Question'}
        value={question}
        inputClass={'question'}
        onChangeHandler={questionChangeHandler}
      />
      <Input
        header={'Askee'}
        value={askee}
        inputClass={'askee'}
        onChangeHandler={askeeChangeHandler}
      />
      <div>
        <Button
          label={'Accepted'}
          buttonClass={'accepted'}
          handleClick={handleInputClick}
        />
        <Button
          label={'Rejected'}
          buttonClass={'rejected'}
          handleClick={handleInputClick}
        />
      </div>
    </div>
  ) : 
  null;

const AddRejectionContainer = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [askee, setAskee] = useState('');

  const changeHandler = setter => e => {
    e.preventDefault();
    setter(e.target.value);
  };
  
  const props = {
    question,
    askee,
    handleInputClick: e => {
      e.preventDefault();
      if (!question || !askee) return;
      dispatch(createQuestion({
        question,
        askee,
        status: e.target.outerText
      }));
      setQuestion('');
      setAskee('');
    },
    questionChangeHandler: changeHandler(setQuestion),
    askeeChangeHandler: changeHandler(setAskee)
  };

  return <AddRejection {...props} />
};

export default AddRejectionContainer;

export { AddRejection };