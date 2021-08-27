import React from 'react';

import Input from '../input/input.js';
import Button from '../button/button.js';

const styles = process.env.NODE_ENV === 'test' ? {} : require('./add-rejection.module.css');

const AddRejectionView = ({
  question,
  askee,
  handleInputClick,
  questionChangeHandler,
  askeeChangeHandler
}) => (
  [
    handleInputClick,
    questionChangeHandler,
    askeeChangeHandler,
    question,
    askee
  ].every(prop => prop !== undefined) &&
  (
    <div className={'add-question'}>
      <Input
        header={'Question'}
        value={question}
        inputClass={'question'}
        onChangeHandler={questionChangeHandler}
        placeholder={'type question here'}
      />
      <Input
        header={'Askee'}
        value={askee}
        inputClass={'askee'}
        onChangeHandler={askeeChangeHandler}
        placeholder={'type askee here'}
      />
      <div className={styles.buttons}>
        <Button
          label={'Accepted'}
          buttonClass={'accepted'}
          handleClick={handleInputClick}
        />
        <Button
          label={'Rejected'}
          buttonClass={'rejected'}
          handleClick={handleInputClick}
        />
      </div>
    </div>
  )
);

export { AddRejectionView };