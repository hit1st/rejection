import React from 'react';

import styles from './input.module.css';

const displayView = ({ header, value, inputClass, onChangeHandler, placeholder='placeholder' }) => {
  if (!header || !onChangeHandler) return null;

  return (
    <div className={styles.container}>
      <h3 className={'input-header'}>{header}</h3>
      <input        
        className={`${inputClass} ${styles.input}`}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </div>
  )
};

const Input = (values = {
  header: '',
  value: '',
  inputClass: 'input',
  onChangeHandler: () => {},
}) => displayView(values);

export default Input;
