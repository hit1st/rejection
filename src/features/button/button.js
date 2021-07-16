import React from 'react';

const Button = ({ buttonClass, label, handleClick }) => (
  buttonClass ? 
    <button className={buttonClass} onClick={handleClick}>{label}</button> :
    null
);

export default Button;
