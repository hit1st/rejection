import React from 'react';
import { useSelector } from 'react-redux';

import createHeadingComponent from '../create-heading-component/create-heading-component.js';
import { getScore, getRejections } from '../rejection/rejection-reducer.js';

const DisplayScore = createHeadingComponent('h3')('Score');

const Score = () => {
  const rejections = useSelector(getRejections);

  return <DisplayScore value={getScore(rejections)} />;
};

export default Score;
