import withRedux from '../src/features/with-redux/with-redux.js';
import RejectionsApp from '../src/features/rejections-app/rejections-app.js';

const Home = withRedux(RejectionsApp);

export default Home;
