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
    payload: fetchedQuestions
  };
};

const getScore = state =>
  state.rejections.reduce((score, question) => (
    question.status === 'Accepted' ? score + 1 :
    question.status === 'Rejected' ? score + 10 :
    score
  ), 0);

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
export { addQuestion, getRejections, getScore, addFetchedQuestions };
