import React from 'react';

import Score from '../score/score.js';
import AddRejection from '../add-rejection/add-rejection.js';
import Rejections from '../rejections-list/rejections.js';
import LineChartWithDailyScoreForTheWeek from '../line-chart/daily-scores-for-the-week-chart.js';
import withLoading from '../with-loading/with-loading.js';

const ChartAndScore = () => (
  <>
    <LineChartWithDailyScoreForTheWeek />
    <Score />
  </>
);

const DisplayChartAndScore = withLoading(ChartAndScore);

const RejectionsApp = () => (
  <>
    <h1>Rejections</h1>
    <DisplayChartAndScore />
    <AddRejection />
    <Rejections />
  </>
);

export default RejectionsApp;
