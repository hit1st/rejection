import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createNamedWrapperReducer,
  createNamedWrapperActionCreator
} from '../../utils/redux-wrappers';
import { addQuestion } from '../rejection/rejection-reducer.js';
import Input, { inputReducer, updateInput, clearInput } from '../input/input.js';
import Button from '../button/button.js';

const getQuestion = state => state ? state.question : undefined;
const getAskee = state => state ? state.askee : undefined;

const clearQuestion = clearInput('question');
const clearAskee = clearInput('askee');

const questionInputReducer = createNamedWrapperReducer(inputReducer, 'question');
const askeeInputReducer = createNamedWrapperReducer(inputReducer, 'askee');
const updateQuestion = createNamedWrapperActionCreator(updateInput, 'question');
const updateAskee = createNamedWrapperActionCreator(updateInput, 'askee');

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
  const question = useSelector(getQuestion);
  const askee = useSelector(getAskee);

  const dispatchTo = setter => e => {
    e.preventDefault();
    dispatch(setter(e.target.value));
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
      dispatch(clearQuestion());
      dispatch(clearAskee());
    },
    questionOnChangeHandler: dispatchTo(updateQuestion),
    askeeOnChangeHandler: dispatchTo(updateAskee)
  };

  return <AddRejection {...props} />
};

export default AddRejectionContainer;

export { AddRejection, questionInputReducer, askeeInputReducer };