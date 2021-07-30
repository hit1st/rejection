import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { updateID, getID } from '../id-reducer/id-reducer.js';
import { handleLocalState } from '../rejection/rejection-reducer.js';
import { useID, useRejections, createRejection } from '../faunagql/api.js';

const handleFetchID = () => {
  return {
    type: 'FETCH_ID'
  };
};

const handleFetchState = () => {
  return {
    type: 'FETCH_STATE'
  };
};

function* fetchID() {
  try {
    const id = yield call(useID);
    yield put(updateID({ id }));
    yield put(handleFetchState());
  } catch (err) {
    console.error(err);
  }
};

function* fetchState() {
  try {
    const id = yield select(getID);
    const { data, errorMessage } = yield call(useRejections, id);
    yield put(handleLocalState({rejections: data}));
  } catch (err) {
    console.error(err);
  }
};

function* saveRejection({ payload } = {}) {
  try {
    const { question, askee, status } = payload
    const userID = yield select(getID);
    yield call(createRejection, { question, askee, status }, userID);
  } catch (err) {
    console.error(err);
  }
}

function* watchFetchID() {
  yield takeEvery('FETCH_ID', fetchID)
};

function* watchFetchState() {
  yield takeEvery('FETCH_STATE', fetchState);
};

function* watchSaveRejection() {
  yield takeEvery('REJECTION::ADD_QUESTION', saveRejection);
};

function* rootSaga() {
  yield all([
    watchSaveRejection(),
    watchFetchState(),
    watchFetchID(),
  ]);
};

export {
  fetchID,
  fetchState,
  handleFetchID,
  handleFetchState,
};
export default rootSaga;
