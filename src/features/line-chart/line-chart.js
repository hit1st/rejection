import React from 'react';
import { useSelector } from 'react-redux';
import { getRejections } from '../rejection/rejection-reducer.js';

// const Rejection = ({
//   question,
//   askee,
//   status
// }) => {
//   return (
//     <li>
//       <p>Question: {question}</p>
//       <p>Askee: {askee}</p>
//       <p>Status: {status}</p>
//     </li>
//   );
// };

// const RejectionsList = ({
//   rejections
// }) => (
//   <ul>
//     {rejections.map(rejection => 
//       <Rejection
//         key={rejection.id}
//         {...rejection}
//       />)}
//   </ul>
// );

// const getVisibleRejections = (
//   rejections,
//   filter
// ) => {
//   switch (filter) {
//     case 'SHOW_ALL':
//       return rejections;
//     case 'SHOW_ACCEPTED':
//       return rejections.filter(rejection => rejection.status === 'Accepted');
//     case 'SHOW_REJECTED':
//       return rejections.filter(rejection => rejection.status === 'Rejected');
//   };
// };

const LineChart = () => {
  const rejections = useSelector(getRejections);
  const mapped = rejections.map(({ status, timestamp }) => ({ status, timestamp: timestamp.value }));
  mapped.sort((a, b) => {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0
  });

  console.log('LineChart mapped: ', mapped);

  return (
    <>
    </> 
  )
};

// export { Rejection, RejectionsList, getVisibleRejections };
export default LineChart;
