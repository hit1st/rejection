import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { handleFetchID } from '../faunadb-sagas/faunadb-sagas.js';
import { getRejections } from '../rejection/rejection-reducer.js';
import { getVisibilityFilter } from '../visibility/visibility-filter.js';
import styles from './styles.module.css';

const Rejection = ({
  question,
  askee,
  status
}) => (
  <li 
    className={`${styles.rejection} ${status === 'Rejected' ? 'rejected' : 'accepted'}`}
  >
    <p>Question: {question}</p>
    <p>Askee: {askee}</p>
    <p>Status: {status}</p>
  </li>
);

const RejectionsList = ({
  rejections
}) => (
  <ul className={styles.rejections}>
    {rejections.map(rejection => 
      <Rejection
        key={rejection.id}
        {...rejection}
      />)}
  </ul>
);

const getVisibleRejections = (
  rejections,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return rejections;
    case 'SHOW_ACCEPTED':
      return rejections.filter(rejection => rejection.status === 'Accepted');
    case 'SHOW_REJECTED':
      return rejections.filter(rejection => rejection.status === 'Rejected');
  };
};

const VisibleRejectionsList = () => {
  const rejections = useSelector(getRejections);
  const visibilityFilter = useSelector(getVisibilityFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleFetchID());
  }, []);

  return (
    <RejectionsList
      rejections={
        getVisibleRejections(
          rejections,
          visibilityFilter
        )
      }
    /> 
  )
};

export { Rejection, RejectionsList, getVisibleRejections };
export default VisibleRejectionsList;
