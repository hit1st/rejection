import React from 'react';

const createHeadingComponent = (HTag = 'h1') => 
  (header = 'header') => ({
    value = 'Hello, this is a header component!'
  } = {}) => (
    <HTag className={header.toLowerCase()}>{header}: {value}</HTag>
  );

export default createHeadingComponent;