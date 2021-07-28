import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../rejection/rejection-reducer.js';
import Input from '../input/input.js';
import Button from '../button/button.js';

const AddRejection = ({
  question,
  askee,
  handleInputClick,
  questionOnChangeHandler,
  askeeOnChangeHandler
}) => [
    handleInputClick,
    questionOnChangeHandler,
    askeeOnChangeHandler
  ].every(el => el) &&
  question !== undefined &&
  askee !== undefined ?
  (
    <div className={'add-question'}>
      <Input
        header={'Question'}
        value={question}
        inputClass={'question'}
        onChangeHandler={questionOnChangeHandler}
      />
      <Input
        header={'Askee'}
        value={askee}
        inputClass={'askee'}
        onChangeHandler={askeeOnChangeHandler}
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
    
      dispatch(addQuestion({
        question,
        askee,
        status: e.target.outerText
      }));
      setQuestion('');
      setAskee('');
    },
    questionOnChangeHandler: changeHandler(setQuestion),
    askeeOnChangeHandler: changeHandler(setAskee)
  };

  return <AddRejection {...props} />
};

export default AddRejectionContainer;

export { AddRejection };