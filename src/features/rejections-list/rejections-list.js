import React from 'react';
import { useSelector } from 'react-redux';

import { getVisibleRejections } from '../rejection/rejection-reducer.js';
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

const VisibleRejectionsList = () => {
  const visibilityFilter = useSelector(getVisibilityFilter);
  const rejections = useSelector(state => getVisibleRejections(state, visibilityFilter));

  return (
    <RejectionsList
      rejections={rejections}
    /> 
  )
};

export { Rejection, RejectionsList, getVisibleRejections };
export default VisibleRejectionsList;
