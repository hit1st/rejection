import React from 'react';

const Button = ({ buttonClass, label, handleClick }) => (
  buttonClass && label && handleClick ? 
    <button className={buttonClass} onClick={handleClick}>{label}</button> :
    null
);

export default Button;
