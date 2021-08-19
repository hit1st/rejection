import React from 'react';

const Button = ({ buttonClass, label, handleClick }) => (
  <button className={buttonClass} onClick={handleClick} style={{ margin: 10 }}>{label}</button>
);

export default Button;
