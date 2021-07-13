import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createNamedWrapperReducer,
  createNamedWrapperActionCreator
} from '../../utils/redux-wrappers';
import { addQuestion, clearRejections } from '../rejection/rejection-reducer.js';
import Input, { inputReducer, updateInput, clearInput } from '../input/input.js';

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
);

const getQuestion = state => state ? state.question : undefined;
const getAskee = state => state ? state.askee : undefined;

const clearQuestion = clearInput('question');
const clearAskee = clearInput('askee');

const questionInputReducer = createNamedWrapperReducer(inputReducer, 'question');
const askeeInputReducer = createNamedWrapperReducer(inputReducer, 'askee');
const updateQuestion = createNamedWrapperActionCreator(updateInput, 'question');
const updateAskee = createNamedWrapperActionCreator(updateInput, 'askee');

const AddRejection = () => {
  const dispatch = useDispatch();
  const question = useSelector(getQuestion);
  const askee = useSelector(getAskee);

  const handleClick = e => {
    e.preventDefault();
    if (!question || !askee) return;

    dispatch(addQuestion({
      question,
      askee,
      status: e.target.outerText
    }));
    clearQuestion();
    clearAskee();
  };

  const dispatchTo = setter => e => {
    e.preventDefault();
    dispatch(setter(e.target.value));
  }

  return (
    <>
      <Input
        header={'Question'}
        value={question}
        onChangeHandler={dispatchTo(updateQuestion)}
      />
      <Input
        header={'Askee'}
        value={askee}
        onChangeHandler={dispatchTo(updateAskee)}
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

export { questionInputReducer, askeeInputReducer };