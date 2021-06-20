import { Provider } from 'react-redux';
import RejectionsApp from '../src/features/rejections-app/rejections-app.js';
import store from '../src/features/rejections-app/store.js';

const Home = () => (
  <Provider store={store}>
    <RejectionsApp />
  </Provider>
);

export default Home;
