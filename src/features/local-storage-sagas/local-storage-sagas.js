import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { handleLocalState, getRejections } from '../rejection/rejection-reducer.js';

const getLocalState = (state = JSON.stringify({ rejections: [] })) =>
  localStorage.getItem('state') ? localStorage.getItem('state') : state;

const setLocalState = (serializedState) => localStorage.setItem('state', serializedState);

const clearLocalState = () => localStorage.removeItem('state');

const handleFetchState = () => {
  return {
    type: 'FETCH_STATE',
  };
};

function* fetchState() {
  try {
    const serializedState = yield call(getLocalState);
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
    yield call(clearLocalState);
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
  clearLocalState,
  getLocalState,
  setLocalState,
  handleFetchState,
};
export default rootSaga;
