import { describe } from 'riteway';
import { LocalStorage} from 'node-localstorage';

import { getStoredQuestions } from './stored-questions.js';

describe('getStoredQuestions', async assert => {
  {
    const questions = [      
      {
        question: 'Can I have a raise?',
        askee: 'Boss',
        status: 'Accepted'
      },
      {
        question: 'Can you buy me a burger?',
        askee: 'Coworker',
        status: 'Rejected'
      },
      {
        question: 'Can I take some time to grab my wallet?',
        askee: 'Boss',
        status: 'Accepted'
      }
    ];

    const window = {
      localStorage: new LocalStorage('./scratch')
    };
    const myStorage = window.localStorage;
    myStorage.setItem('questions', JSON.stringify(questions));
    // console.log('myStorage questions: ', JSON.parse(myStorage.getItem('questions')));

    assert({
      given: 'no arguments',
      should: 'return array',
      actual: Array.isArray(getStoredQuestions()),
      expected: true
    });
  }
});
