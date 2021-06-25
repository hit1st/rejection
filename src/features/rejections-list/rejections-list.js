import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleFetchState } from '../local-storage-sagas/local-storage-sagas.js';

const Rejection = ({
  question,
  askee,
  status
}) => {
  return (
    <li>
      <p>Question: {question}</p>
      <p>Askee: {askee}</p>
      <p>Status: {status}</p>
    </li>
  );
};

const RejectionsList = ({
  rejections
}) => (
  <ul>
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
  const { rejections, visibilityFilter } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(handleFetchState())
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
