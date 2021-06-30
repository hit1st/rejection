import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { handleLocalState, getRejections } from '../rejection/rejection-reducer.js';

const getLocalState = (state = '[]') => state === 'state' ? localStorage.getItem('state') : state;

const setLocalState = (serializedState) => localStorage.setItem('state', serializedState);

const handleFetchState = () => {
  return {
    type: 'FETCH_STATE',
  };
};

function* fetchState() {
  try {
    const serializedState = yield call(getLocalState, 'state');
    const localState = yield call(JSON.parse, serializedState);
    yield put(handleLocalState(localState));
  } catch (err) {
    console.error(err);
  }
};

function* saveState() {
  try {
    const rejections = yield select(getRejections);
    const serializedState = yield call(JSON.stringify, { rejections });
    yield call(setLocalState, serializedState);
  } catch (err) {
    console.error(err);
  }
};

function* clearState() {
  try {
    const clearedState = yield call(JSON.stringify, { rejections: null });
    yield call(setLocalState, clearedState);
  } catch (err) {
    console.error(err);
  }
};

function* watchFetchState() {
  yield takeEvery('FETCH_STATE', fetchState);
};

function* watchSaveState() {
  yield takeEvery('REJECTION::ADD_QUESTION', saveState);
}

function* watchClearState() {
  yield takeEvery('REJECTION::CLEAR_REJECTIONS', clearState)
}

function* rootSaga() {
  yield all([
    watchSaveState(),
    watchFetchState(),
    watchClearState()
  ]);
};

export {
  fetchState,
  saveState,
  clearState,
  getLocalState,
  setLocalState,
  handleFetchState,
};
export default rootSaga;
