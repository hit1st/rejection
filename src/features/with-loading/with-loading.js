import React from 'react';
import { useSelector } from 'react-redux';

import { getIsLoading } from '../is-loading/is-loading-reducer';

const withLoading = Component => ({ ...props }) => (
  <>
    {!useSelector(getIsLoading) && <Component { ...props } />} 
  </>
);

export default withLoading;