import React from 'react';

const Button = ({ buttonClass, label, handleClick }) => (
  <button className={buttonClass} onClick={handleClick}>{label}</button>
);

export default Button;
