import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from '../rejection/rejection-reducer.js';
import { questionInputReducer, askeeInputReducer } from '../add-rejection/add-rejection.js'
import visibilityFilter from '../visibility/visibility-filter.js';
import { loadState, saveState } from '../local-storage/localStorage';
import { throttle } from 'lodash';
import rootSaga from '../local-storage-sagas/local-storage-sagas.js';

const composeEnhancers = typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
  }) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const rejectionsApp = combineReducers({
  rejections: reducer,
  question: questionInputReducer,
  askee: askeeInputReducer,
  visibilityFilter
});

const initializeStore = () => {
  const store = createStore(
    rejectionsApp,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = initializeStore();

export default store;
