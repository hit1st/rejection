import React from 'react';

const styles = process.env.NODE_ENV === 'test' ? {} : require('./input.module.css');

const displayView = ({
  header,
  value,
  inputClass,
  onChangeHandler,
  placeholder = 'placeholder'
}) => {
  if (!header || !onChangeHandler) return null;
  return (
    <div className={styles.container}>
      <h3 className={`input-label ${styles.label}`}>{header}</h3>
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
  onChangeHandler: () => {}
}) => displayView(values);

export default Input;
