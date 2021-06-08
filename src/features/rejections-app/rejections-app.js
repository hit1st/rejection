import React from 'react';
import Score from '../score/score.js';
import AddRejection from '../add-rejection/add-rejection.js';
import RejectionsVisibility from '../rejections-visibility/rejections-visibility.js';
import VisibleRejectionsList from '../rejections-list/rejections-list.js';

const RejectionsApp = () => (
  <>
    <Score />
    <AddRejection />
    <RejectionsVisibility />
    <VisibleRejectionsList />
  </>
);

export default RejectionsApp;
