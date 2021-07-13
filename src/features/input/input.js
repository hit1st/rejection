import React from 'react';

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

export default Input;

export { inputReducer, updateInput, clearInput };