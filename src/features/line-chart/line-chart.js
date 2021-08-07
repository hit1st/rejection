import React from 'react';
import { useSelector } from 'react-redux';
import { getRejections } from '../rejection/rejection-reducer.js';

const format = number => number < 10 ? `0${number}` : `${number}`;

const dateMaker = (date) => `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;

const daysBeforeDate = (date = new Date()) => (numberOfDaysBefore = 0) => {
  const daysBefore = new Date(date);
  daysBefore.setDate(daysBefore.getDate() - numberOfDaysBefore);
  return  daysBefore;
};

const daysForTheWeek = (date = new Date()) => {
  const dates = [];

  for (let i = 6; i > -1; i -= 1) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
  }

  return dates;
};

const today = new Date();
const week = [];

for (let i = 7; i > 0; i -= 1) {
  const newDay = new Date();
  newDay.setDate(today.getDate() - i)
  week.push(dateMaker(newDay));
}

console.log('week: ', week);

const LineChart = () => {
  const rejections = useSelector(getRejections);
  console.log('LineChart rejections: ', rejections);
  const mapped = rejections.map(({ status, timestamp }) => ({ status, timestamp: timestamp.value.slice(0, 10) }));
  mapped.sort((a, b) => {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0
  });

  console.log('LineChart mapped: ', mapped);

  let day = 0;
  let mappedIdx = 0;
  let score = 0;
  const dailyScoreForTheWeek = [];

  while (day < week.length) {
    while (mappedIdx < mapped.length) {
      if (mapped[mappedIdx].timestamp <= week[day]) {
        score += mapped[mappedIdx].status === 'Rejected' ? 10 : 1;
      }
      mappedIdx += 1;
      if (mappedIdx < mapped.length && mapped[mappedIdx].timestamp > week[day]) {
        dailyScoreForTheWeek.push(score);
        day += 1;
      }
    }
    dailyScoreForTheWeek.push(score);
    day += 1;
  }
  console.log('dailyScoreForTheWeek: ', dailyScoreForTheWeek);

  return (
    <>
    </> 
  )
};

export default LineChart;

export { dateMaker, daysBeforeDate, daysForTheWeek };