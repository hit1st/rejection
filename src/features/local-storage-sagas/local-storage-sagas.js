import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { handleLocalState } from '../rejection/rejection-reducer.js';

const getRejections = state => state.rejections;

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
    const serializedState = yield call(JSON.stringify, rejections);
    yield call(setLocalState, serializedState);
  } catch (err) {
    console.error(err);
  }
}

function* watchFetchState() {
  yield takeEvery('FETCH_STATE', fetchState);
};

function* watchSaveState() {
  yield takeEvery('REJECTION::ADD_QUESTION', saveState);
}

function* rootSaga() {
  yield all([
    watchSaveState(),
    watchFetchState()
  ]);
};

export { fetchState, getLocalState, handleFetchState };
export default rootSaga;
