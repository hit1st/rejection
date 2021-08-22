import React from 'react';
import { useSelector } from 'react-redux';
import { getDailyScoresForTheDuration } from '../rejection/rejection-reducer.js';
import {
  dateMaker,
  daysForTheWeek
} from '../../utils/date-utils.js';
import LineChart from './line-chart';

const LineChartWithDailyScoreForTheWeek = (props) => {
  const week = daysForTheWeek().map(date => dateMaker(date));
  const dailyScoresForTheWeek = useSelector(state => getDailyScoresForTheDuration(state, week));

  return <LineChart rawData={dailyScoresForTheWeek} {...props} />
};

export default LineChartWithDailyScoreForTheWeek;