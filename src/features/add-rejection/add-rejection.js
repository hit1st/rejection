import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion, clearState } from '../rejection/rejection-reducer.js';

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
);

const Input = ({ header, value, onChangeHandler }) => (
  <>
    <h3>{header}</h3>
    <input value={value} onChange={onChangeHandler} />
  </>
);

const AddRejection = () => {
  const dispatch = useDispatch();
  const [ question, setQuestion ] = useState('');
  const [ askee, setAskee ] = useState('');

  const handleClick = e => {
    e.preventDefault();
    if (!question || !askee) return;

    dispatch(addQuestion({
      question,
      askee,
      status: e.target.outerText
    }));
    setQuestion('');
    setAskee('');
  };

  const inputSetter = setter => e => {
    e.preventDefault();
    setter(e.target.value);
  }

  return (
    <>
      <Input
        header={'Question'}
        value={question}
        onChangeHandler={inputSetter(setQuestion)}
      />
      <Input
        header={'Askee'}
        value={askee}
        onChangeHandler={inputSetter(setAskee)}
      />
      <div>
        <Button
          label={'Accepted'}
          handleClick={handleClick}
        />
        <Button
          label={'Rejected'}
          handleClick={handleClick}
        />
        <Button
          label={'Clear rejections'}
          handleClick={e => {
            e.preventDefault();
            dispatch(clearState());
          }}
        />
      </div>
    </>
  );
};

export default AddRejection;
