import { Provider } from 'react-redux';

import store from '../rejections-app/store.js';

const withRedux = Component => ({ ...props }) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

export default withRedux;