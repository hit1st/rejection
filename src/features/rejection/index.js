import React from 'react';
import { reducer, addQuestion, getScore } from './rejection-reducer.js';

myStorage = window.localStorage;

const Rejection = function Rejection() {
  myStorage.setItem('questions', JSON.stringify([]));
  console.log('myStorage questions: ', JSON.parse(myStorage.getItem('questions')));
};

export default Rejection;