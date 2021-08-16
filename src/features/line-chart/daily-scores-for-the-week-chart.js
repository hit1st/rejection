import React from 'react';
import { useSelector } from 'react-redux';
import { getRejections } from '../rejection/rejection-reducer.js';
import {
  dateMaker,
  daysForTheWeek,
  getDailyScoreForTheDuration
} from '../../utils/date-utils.js';
import LineChart from './line-chart';

const LineChartWithDailyScoreForTheWeek = (props) => {
  const rejections = useSelector(getRejections);
  const week = daysForTheWeek().map(date => dateMaker(date));
  const dailyScoreForTheWeek = getDailyScoreForTheDuration(rejections, week);

  return <LineChart rawData={dailyScoreForTheWeek} {...props} />
};

export default LineChartWithDailyScoreForTheWeek;