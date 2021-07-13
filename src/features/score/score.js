import React from 'react';
import { useSelector } from 'react-redux';
import { getScore, getRejections } from '../rejection/rejection-reducer.js';

const DisplayScore = ({ score }) => (<h3>Score: {score}</h3>)

const Score = () => {
  const rejections = useSelector(getRejections);

  return <DisplayScore score={getScore(rejections)} />;
};

export default Score;
