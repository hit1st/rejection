import cuid from 'cuid';

const getRejections = state => state ? state.rejections : undefined;

const createQuestion = ({
  question = '',
  askee = '',
  status = '',
} = {}) => {
  return {
    type: 'REJECTION::CREATE_QUESTION',
    payload: {
      question,
      askee,
      status,
    }
  };
};

const addQuestion = ({
  question = '',
  askee = '',
  status = '',
  id = cuid(),
  timestamp = Date.now()
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
  state.reduce((score, question) => (
    question.status === 'Accepted' ? score + 1 :
    question.status === 'Rejected' ? score + 10 :
    score
  ), 0);

const reducer = (
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


export { reducer, createQuestion, addQuestion, getRejections, getScore, addFetchedQuestions };
