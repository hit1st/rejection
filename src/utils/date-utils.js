const format = number => number < 10 ? `0${number}` : `${number}`;

const dateMaker = (date) => `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;


const daysForTheWeek = (date = new Date()) => {
  const dates = [];

  for (let i = 6; i > -1; i -= 1) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
  }

  return dates;
};

export { dateMaker, daysForTheWeek };