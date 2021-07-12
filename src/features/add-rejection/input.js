import React from 'react';
import { createNamedWrapperReducer, createNamedWrapperActionCreator } from '../../utils/redux-wrappers';

const getQuestion = state => state ? state.question : undefined;
const getAskee = state => state ? state.askee : undefined;

const displayView = ({ header, value, onChangeHandler }) => {
  if (!header || !onChangeHandler) return null;
  return (
    <>
      <h3 className={'input-header'}>{header}</h3>
      <input className={'input'} value={value} onChange={onChangeHandler} />
    </>
  )
};

const Input = (values = {
  header: '',
  value: '',
  onChangeHandler: () => {}
}) => displayView(values);

const updateInput = (value = '') => ({
  type: 'ADD_REJECTION::UPDATE_INPUT',
  payload: value
});

const clearInput = (name) => () => ({
  name,
  type: 'ADD_REJECTION::CLEAR_INPUT'
});
const clearQuestion = clearInput('question');
const clearAskee = clearInput('askee');

const inputReducer = (
  state = '',
  { type, payload } = {}
) => {
  switch (type) {
    case 'ADD_REJECTION::UPDATE_INPUT':
      return payload
    case 'ADD_REJECTION::CLEAR_INPUT':
      return ''
    default:
      return state;
  }
};

const questionInputReducer = createNamedWrapperReducer(inputReducer, 'question');
const askeeInputReducer = createNamedWrapperReducer(inputReducer, 'askee');
const updateQuestion = createNamedWrapperActionCreator(updateInput, 'question');
const updateAskee = createNamedWrapperActionCreator(updateInput, 'askee');

export default Input;

export { inputReducer, updateInput, clearInput, questionInputReducer, askeeInputReducer, updateQuestion, updateAskee, clearQuestion, clearAskee, getQuestion, getAskee };