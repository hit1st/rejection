import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { updateID, getID } from '../id-reducer/id-reducer.js';
import { handleLocalState, getRejections } from '../rejection/rejection-reducer.js';
import { useID, useRejections, createRejection } from '../faunagql/api.js';

const getLocalState = (state = JSON.stringify({ rejections: [] })) =>
  localStorage.getItem('state') ? localStorage.getItem('state') : state;

const setLocalState = (serializedState) => localStorage.setItem('state', serializedState);

const clearLocalState = () => localStorage.removeItem('state');

const handleFetchID = () => {
  return {
    type: 'FETCH_ID',
  };
};

const handleFetchState = () => {
  return {
    type: 'FETCH_STATE',
  };
};

function* fetchID () {
  try {
    const { data, errorMessage } = yield call(useID);
    const { id } = data.userByName.data[0];
    yield put(updateID({ id }));
    yield put(handleFetchState());
  } catch (err) {
    console.error(err);
  }
};

function* fetchState() {
  try {
    const id = yield select(getID);
    const { data, errorMessage } = yield call(useRejections, [id]);
    const rejections = data.findUserByID.rejections.data.map((data) => (data));
    yield put(handleLocalState({rejections}));
  } catch (err) {
    console.error(err);
  }
};

function* saveRejection({ payload } = {}) {
  try {
    const { question, askee, status } = payload
    // console.log('action: ', action);
    const userID = yield select(getID);
    const user = { connect: userID }
    const { data } = yield call(createRejection, [{ question, askee, status, user }]);
    // const { data, errorMessage } = yield call(useRejections, [id]);
    // const rejections = data.findUserByID.rejections.data.map((data) => (data));
    // yield put(handleLocalState({rejections}));
    // yield put(handleFetchState());
  } catch (err) {
    console.error(err);
  }
}

// function* saveState() {
//   try {
//     const rejections = yield select(getRejections);
//     const serializedState = yield call(JSON.stringify, { rejections });
//     yield call(setLocalState, serializedState);
//   } catch (err) {
//     console.error(err);
//   }
// };

function* clearState() {
  try {
    yield call(clearLocalState);
  } catch (err) {
    console.error(err);
  }
};

function* watchFetchID() {
  yield takeEvery('FETCH_ID', fetchID)
};

function* watchFetchState() {
  yield takeEvery('FETCH_STATE', fetchState);
};

function* watchSaveRejection() {
  yield takeEvery('REJECTION::ADD_QUESTION', saveRejection);
};

// function* watchSaveState() {
//   yield takeEvery('REJECTION::ADD_QUESTION', saveState);
// };

function* watchClearState() {
  yield takeEvery('REJECTION::CLEAR_REJECTIONS', clearState)
};

function* rootSaga() {
  yield all([
    // watchSaveState(),
    watchSaveRejection(),
    watchFetchState(),
    watchFetchID(),
    watchClearState()
  ]);
};

export {
  fetchID,
  fetchState,
  // saveState,
  clearState,
  clearLocalState,
  getLocalState,
  setLocalState,
  handleFetchID,
  handleFetchState,
};
export default rootSaga;
