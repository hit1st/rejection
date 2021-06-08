import { createStore, combineReducers } from 'redux';
import { reducer } from '../rejection/rejection-reducer.js';
import visibilityFilter from '../visibility/visibility-filter.js';

const rejectionsApp = combineReducers({
  rejections: reducer,
  visibilityFilter
});

const store = createStore(rejectionsApp);

export default store;
