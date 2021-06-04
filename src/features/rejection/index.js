import React from 'react';
import { reducer, addQuestion, getScore } from './rejection-reducer.js';

const myStorage = window.localStorage;

const Rejection = function Rejection() {
  myStorage.setItem('questions', []);
  console.log('myStorage questions: ', myStorage.getItem('questions'));
};

export default Rejection;