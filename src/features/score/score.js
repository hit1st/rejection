import React from 'react';
import { useSelector } from 'react-redux';
import { getScore } from '../rejection/rejection-reducer.js';

const Score = () => {
  const { rejections } = useSelector(state => state);

  return (
    <h1>Score: {getScore(rejections)}</h1>
  );
};

export default Score;
