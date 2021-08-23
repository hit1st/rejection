const getDaysForTheWeek = (date = new Date()) => {
  const dates = [];

  for (let i = 6; i > -1; i -= 1) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i));
  }

  return dates;
};

export { getDaysForTheWeek };