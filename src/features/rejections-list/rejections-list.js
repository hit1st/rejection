import React from 'react';

const RejectionsApp = ({ score, rejections, accepted, rejected }) => (
  <>
    <h1>Score: {score}</h1>
    <button onClick={accepted}>Accepted</button>
    <button onClick={rejected}>Rejected</button>
    <ul>
      {rejections.map(rejection => 
        <li key={rejection.id}>
          {JSON.stringify(rejection)}
        </li>
      )}
    </ul>
  </>
);

export default RejectionsApp;
