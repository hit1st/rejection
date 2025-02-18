import { v4 as getId } from 'uuid';

const addQuestion = ({
  question,
  askee,
  status
} = {}) => {
  if (!question || !askee || !status) return;
  return { 
    type: 'REJECTION::ADD_QUESTION',
    payload: {
      question,
      askee,
      status,
      id: getId(),
      timestamp: Date.now(),
    }
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
    default:
      return state;
  };
};


export { reducer, addQuestion, getScore };