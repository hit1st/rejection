const format = number => number < 10 ? `0${number}` : `${number}`;

const dateMaker = (date) => `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;

// const daysBeforeDate = (date = new Date()) => (numberOfDaysBefore = 0) => {
//   const daysBefore = new Date(date);
//   daysBefore.setDate(daysBefore.getDate() - numberOfDaysBefore);
//   return  daysBefore;
// };

const daysForTheWeek = (date = new Date()) => {
  const dates = [];

  for (let i = 6; i > -1; i -= 1) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
  }

  return dates;
};

const getDailyScoreForTheDuration = (rejections = [], duration = []) => {
  const dailyScoreForTheDuration = [];
  const statuses = rejections.map(({ status, timestamp }) => ({
    status,
    timestamp: dateMaker(new Date(timestamp)) 
  }));
  let day = 0;
  let statusesIdx = 0;
  let score = 0;

  statuses.sort((a, b) => {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0
  });

  while (day < duration.length) {
    // current status timestamp <= current day update score and update status index
    if (statusesIdx < statuses.length) {
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

// export { dateMaker, daysBeforeDate, daysForTheWeek, getDailyScoreForTheDuration };
export { dateMaker, daysForTheWeek, getDailyScoreForTheDuration };