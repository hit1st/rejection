import React, { useEffect }  from 'react';
import { useDispatch } from 'react-redux';

import { handleFetchID } from '../faunadb-sagas/faunadb-sagas.js';

const withID = Component => props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleFetchID());
  }, []);

  return <Component {...props} />
};

export default withID;
