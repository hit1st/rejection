import React from 'react';

const styles = process.env.NODE_ENV === 'test' ? {} : require('./button.module.css');

const Button = ({ buttonClass, label, handleClick }) => (
  <button className={`${buttonClass} ${styles.button}`} onClick={handleClick} >{label}</button>
);

export default Button;
