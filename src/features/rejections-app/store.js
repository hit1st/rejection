import { createStore, combineReducers } from 'redux';
import { reducer } from '../rejection/rejection-reducer.js';
import visibilityFilter from '../visibility/visibility-filter.js';
import { loadState, saveState } from '../local-storage/localStorage';

const rejectionsApp = combineReducers({
  rejections: reducer,
  visibilityFilter
});

const persistedState = loadState();

const store = createStore(
  rejectionsApp,
  persistedState
);

store.subscribe(() => {
  saveState({
    rejections: store.getState().rejections
  });
});

export default store;
