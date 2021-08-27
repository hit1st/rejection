import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createQuestion } from '../faunadb-sagas/faunadb-sagas.js';

const withAddRejection = Component => props => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [askee, setAskee] = useState('');

  const changeHandler = setter => e => {
    e.preventDefault();
    setter(e.target.value);
  };
  
  const newProps = {
    question,
    askee,
    handleInputClick: e => {
      e.preventDefault();
      if (!question || !askee) return;
      dispatch(createQuestion({
        question,
        askee,
        status: e.target.outerText
      }));
      setQuestion('');
      setAskee('');
    },
    questionChangeHandler: changeHandler(setQuestion),
    askeeChangeHandler: changeHandler(setAskee),
    ...props
  };

  return <Component {...newProps} />
};

export default withAddRejection;
