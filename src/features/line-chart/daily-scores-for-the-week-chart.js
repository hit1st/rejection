import React from 'react';
import { useSelector } from 'react-redux';

import { getDailyScoresForTheDuration } from '../rejection/rejection-reducer.js';
import { getDaysForTheWeek } from '../../utils/date-utils.js';
import SevenDayLineChart from './seven-day-line-chart';

const LineChartWithDailyScoreForTheWeek = (props) => {
  const week = getDaysForTheWeek();
  const dailyScoresForTheWeek = useSelector(state => getDailyScoresForTheDuration(state, week));

  return <SevenDayLineChart data={dailyScoresForTheWeek} {...props} />
};

export default LineChartWithDailyScoreForTheWeek;