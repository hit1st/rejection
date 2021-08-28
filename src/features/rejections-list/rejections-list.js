import React from 'react';

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

export { Rejection, RejectionsList };
