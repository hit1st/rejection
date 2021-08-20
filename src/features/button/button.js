import React from 'react';

import styles from './button.module.css';

const Button = ({ buttonClass, label, handleClick }) => (
  <button className={`${buttonClass} ${styles.button}`} onClick={handleClick} >{label}</button>
);

export default Button;
