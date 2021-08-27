const getRejections = state => state ? state.rejections : undefined;

const addQuestion = ({
  question = '',
  askee = '',
  status = '',
  id = '',
  timestamp = ''
} = {}) => {
  return {
    type: 'REJECTION::ADD_QUESTION',
    payload: {
      question,
      askee,
      status,
      id,
      timestamp
    }
  };
};

const addFetchedQuestions = (fetchedQuestions = []) => {
  return {
    type: 'ADD_FETCHED_QUESTIONS',
    payload: fetchedQuestions.map(question => ({ ...question, timestamp: new Date(question.timestamp) }))
  };
};

const getScore = state =>
  getRejections(state).reduce((score, question) => (
    question.status === 'Accepted' ? score + 1 :
    question.status === 'Rejected' ? score + 10 :
    score
  ), 0);

const getDailyScoresForTheDuration = (state, duration = []) => {
  const dailyScoreForTheDuration = [];
  const statuses = getRejections(state)
    .map(({ status, timestamp }) => ({
      status,
      timestamp: new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate())
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
  let day = 0;
  let statusesIdx = 0;
  let score = 0;

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

const rejectionsReducer = (
  state = [],
  { type, payload } = {}
) => {
  switch (type) {
    case addQuestion().type:
      return [...state, payload]
    case addFetchedQuestions().type:
      return [...payload]
    default:
      return state;
  };
};

export default rejectionsReducer;
export {
  addQuestion,
  getRejections,
  getScore,
  addFetchedQuestions,
  getDailyScoresForTheDuration
};
