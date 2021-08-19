import React from 'react';

const displayView = ({ header, value, inputClass, onChangeHandler }) => {
  if (!header || !onChangeHandler) return null;
  return (
    <>
      <h3 className={'input-header'}>{header}</h3>
      <input className={inputClass} value={value} onChange={onChangeHandler} style={{ width: 480 }}/>
    </>
  )
};

const Input = (values = {
  header: '',
  value: '',
  inputClass: 'input',
  onChangeHandler: () => {}
}) => displayView(values);

export default Input;
