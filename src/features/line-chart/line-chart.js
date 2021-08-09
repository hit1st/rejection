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

const getDailyScoreForTheDuration = (rejections = [], duration = []) => {
  const dailyScoreForTheDuration = [];
  const statuses = rejections.map(({ status, timestamp }) => ({ status, timestamp: timestamp.value.slice(0, 10) }));
  statuses.sort((a, b) => {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0
  });

  let day = 0;
  let statusesIdx = 0;
  let score = 0;

  // while (day < duration.length && statusesIdx < statuses.length) {
  //   // current status timestamp <= current day update score and update status index
  //   if (statuses[statusesIdx].timestamp <= duration[day]) {
  //     score += statuses[statusesIdx].status === 'Rejected' ? 10 : 1;
  //     statusesIdx += 1;
  //   }

  //   // if status
  //   if (statusesIdx < statuses.length) {
  //     if (statuses[statusesIdx].timestamp > duration[day]) {
  //       dailyScoreForTheDuration.push({ date: duration[day], score });
  //       day += 1;
  //     } 
  //   } else {
  //     statusesIdx += 1;
  //   }
  // }
  // while (day < duration.length) {
  //   dailyScoreForTheDuration.push({ date: duration[day], score });
  //   day += 1;
  // }
  /*        

    faunatime and date do not coincide. need to change created_at to use new Date()


  */
  while (day < duration.length) {
    // current status timestamp <= current day update score and update status index
    console.log('statusesIdx: ', statusesIdx);
    if (statusesIdx < statuses.length) {
      console.log(`statuses[${statusesIdx}].timestamp: ${statuses[statusesIdx].timestamp}`);
      console.log(`duration[${day}]: ${duration[day]}`);
      console.log(statuses[statusesIdx].timestamp <= duration[day]);
      if (statuses[statusesIdx].timestamp <= duration[day]) {
        score += statuses[statusesIdx].status === 'Rejected' ? 10 : 1;
        statusesIdx += 1;
      } else {
        dailyScoreForTheDuration.push({ date: duration[day], score });
        day += 1;
      }
    } else {
      dailyScoreForTheDuration.push({ date: duration[day], score });
      day += 1;
      statusesIdx += 1;
    }
  }
  return dailyScoreForTheDuration;
};


const LineChart = () => {
  const rejections = useSelector(getRejections);
  const week = daysForTheWeek().map(date => dateMaker(date));
  // const dailyScoreForTheWeek = getDailyScoreForTheDuration(rejections, week);

  // console.log('dailyScoreForTheWeek: ', dailyScoreForTheWeek);

  return (
    <>
    </> 
  )
};

export default LineChart;

export { dateMaker, daysBeforeDate, daysForTheWeek, getDailyScoreForTheDuration };