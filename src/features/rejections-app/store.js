import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import idReducer from '../id-reducer/id-reducer.js';
import rejectionsReducer from '../rejection/rejection-reducer.js';
import visibilityFilter from '../visibility/visibility-filter.js';
import rootSaga from '../faunadb-sagas/faunadb-sagas.js';

const composeEnhancers = typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
  }) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');

  middlewares = [...middlewares, logger];
}

const rejectionsApp = combineReducers({
  id: idReducer,
  rejections: rejectionsReducer,
  visibilityFilter
});

const initializeStore = () => {
  const store = createStore(
    rejectionsApp,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = initializeStore();

export default store;
