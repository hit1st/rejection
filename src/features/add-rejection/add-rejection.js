import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, clearRejections } from '../rejection/rejection-reducer.js';
import Input, { updateQuestion, updateAskee, clearQuestion, clearAskee, getQuestion, getAskee } from './input.js';

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
);

// const Input = () => {}
// const Input = ({ header, value, onChangeHandler }) => (
//   <>
//     <h3>{header}</h3>
//     <input value={value} onChange={onChangeHandler} />
//   </>
// );

const AddRejection = () => {
  const dispatch = useDispatch();
  const question = useSelector(getQuestion);
  const askee = useSelector(getAskee);
  // const [ question, setQuestion ] = useState('');
  // const [ askee, setAskee ] = useState('');

  const handleClick = e => {
    e.preventDefault();
    if (!question || !askee) return;

    dispatch(addQuestion({
      question,
      askee,
      status: e.target.outerText
    }));
    // setQuestion('');
    // setAskee('');
    clearQuestion();
    clearAskee();
  };

  const inputSetter = setter => e => {
    e.preventDefault();
    dispatch(setter(e.target.value));
  }

  return (
    <>
      <Input
        header={'Question'}
        value={question}
        // onChangeHandler={inputSetter(setQuestion)}
        onChangeHandler={inputSetter(updateQuestion)}
      />
      <Input
        header={'Askee'}
        value={askee}
        // onChangeHandler={inputSetter(setAskee)}
        onChangeHandler={inputSetter(updateAskee)}
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
            dispatch(clearRejections());
          }}
        />
      </div>
    </>
  );
};

export default AddRejection;

export { Input };
