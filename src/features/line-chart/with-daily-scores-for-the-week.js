import { useSelector } from 'react-redux';

import { getDailyScoresForTheDuration } from '../rejection/rejection-reducer.js';
import { getDaysForTheWeek } from '../../utils/date-utils.js';

const withDailyScoresForTheWeek = Component => props => {
  const week = getDaysForTheWeek();
  const dailyScoresForTheWeek = useSelector(state => getDailyScoresForTheDuration(state, week));

  return <Component data={dailyScoresForTheWeek} {...props} />;
};

export default withDailyScoresForTheWeek;