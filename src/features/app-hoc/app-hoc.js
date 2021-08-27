import { compose } from 'lodash/fp';
import withRedux from '../with-redux/with-redux.js';
import withID from '../with-id/with-id.js';

export default compose(
  withRedux,
  withID
);
