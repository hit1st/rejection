import React, { useReducer } from 'react';

import RejectionsVisibilityBar from '../rejections-visibility/rejections-visibility-bar.js';
import withVisibilityFilter from '../rejections-list/with-visibility-filter.js';
import { RejectionsList } from '../rejections-list/rejections-list.js';
import visibilityFilter,
{
  showAll
} from '../visibility/visibility-filter.js';

const VisibleRejectionsList = withVisibilityFilter(RejectionsList);

const Rejections = () => {
  const [visibility, dispatch] = useReducer(visibilityFilter, showAll());

  return (
    <>
      <RejectionsVisibilityBar visibility={visibility} dispatch={dispatch} />
      <VisibleRejectionsList visibilityFilter={visibility} />
    </>
  );
};

// const Rejections = () => (
//   <>
//     <RejectionsVisibilityBar />
//     <VisibleRejectionsList />
//   </>
// );

export default Rejections;
