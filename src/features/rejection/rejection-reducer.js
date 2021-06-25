import cuid from 'cuid';

const addQuestion = ({
  question = '',
  askee = '',
  status = '',
  id = cuid(),
  timestamp = Date.now()
} = {}) => {
  if (!question || !askee || !status) return;
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

const handleLocalState = (localState = { rejections: [] }) => {
  return {
    type: 'ADD_LOCAL_STATE',
    payload: localState.rejections
  };
};

const getScore = state =>
  state.reduce((score, question) =>
    question.status === 'Accepted' ? score + 1 :
      question.status === 'Rejected' ? score + 10 :
        score, 0);

const reducer = (
  state = [],
  { type, payload } = {}
) => {
  switch (type) {
    case 'REJECTION::ADD_QUESTION':
      return [...state, payload]
    case 'ADD_LOCAL_STATE':
      return [...state, ...payload]
    default:
      return state;
  };
};


export { reducer, addQuestion, getScore, handleLocalState };
