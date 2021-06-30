import cuid from 'cuid';

const getRejections = state => state ? state.rejections : undefined;

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

const clearRejections = () => ({ type: 'REJECTION::CLEAR_REJECTIONS' });

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
    case 'REJECTION::ADD_QUESTION':
      return [...state, payload]
    case 'ADD_LOCAL_STATE':
      return [...state, ...payload]
    case 'REJECTION::CLEAR_REJECTIONS':
      return []
    default:
      return state;
  };
};


export { reducer, addQuestion, getRejections, getScore, handleLocalState, clearRejections };
