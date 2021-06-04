const addQuestion = ({
  question,
  askee,
  status
} = {}) => {
  if (!question || !askee || !status) return;
  const id = (() => JSON.stringify(Date.now()))();
  const timestamp = (() => Date.now())();
  return { 
    type: 'rejection/addQuestion',
    payload: {
      id,
      timestamp,
      question,
      askee,
      status
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
    case 'rejection/addQuestion': return [...state, payload]
    default: return state;
  };
};


export { reducer, addQuestion, getScore };