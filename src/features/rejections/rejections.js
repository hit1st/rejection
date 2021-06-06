import React from 'react';

const Rejections = ({ score, rejections, accepted, rejected }) => (
  <>
    <h1>Score: {score}</h1>
    <ul>
      {rejections.map(rejection => 
        <li key={rejection.id}>
          {JSON.stringify(rejection)}
        </li>
      )}
    </ul>
    <button onClick={accepted}>Accepted</button>
    <button onClick={rejected}>Rejected</button>
  </>
);

export default Rejections;
