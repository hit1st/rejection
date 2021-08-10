import React from 'react';
import { useSelector } from 'react-redux';
import { getRejections } from '../rejection/rejection-reducer.js';
import { dateMaker, daysForTheWeek, getDailyScoreForTheDuration } from '../../utils/date-utils.js';

const LineChart = () => {
  const rejections = useSelector(getRejections);
  console.log('LineChart rejections: ', rejections);
  const week = daysForTheWeek().map(date => dateMaker(date));
  const dailyScoreForTheWeek = getDailyScoreForTheDuration(rejections, week);

  console.log('dailyScoreForTheWeek: ', dailyScoreForTheWeek);

  return (
    <>
    </> 
  )
};

export default LineChart;
