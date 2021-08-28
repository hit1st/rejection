import { useSelector } from 'react-redux';

import { getVisibleRejections } from '../rejection/rejection-reducer.js';
import { getVisibilityFilter } from '../visibility/visibility-filter.js';

const withVisibilityFilter = Component => ({
  visibilityFilter = useSelector(getVisibilityFilter),
  ...props
}) => {
  const rejections = useSelector(state => getVisibleRejections(state, visibilityFilter));

  return <Component rejections={rejections} {...props} />;
};

export default withVisibilityFilter;
