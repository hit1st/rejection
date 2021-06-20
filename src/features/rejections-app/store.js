import { createStore, combineReducers } from 'redux';
import { reducer } from '../rejection/rejection-reducer.js';
import visibilityFilter from '../visibility/visibility-filter.js';
import { loadState, saveState } from '../local-storage/localStorage';
import throttle from 'lodash/throttle';

const rejectionsApp = combineReducers({
  rejections: reducer,
  visibilityFilter
});

const persistedState = loadState();

const store = createStore(
  rejectionsApp,
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    rejections: store.getState().rejections
  });
}, 1000));

export default store;
