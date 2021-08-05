import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { updateID, getID } from '../id-reducer/id-reducer.js';
import { addFetchedQuestions, addQuestion } from '../rejection/rejection-reducer.js';
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

const handleFetchStateError = err => ({
  type: 'IO_ERROR_FETCH_STATE',
  payload: err
});

const handleError = err => ({
  type: 'IO_ERROR',
  payload: err
});

const createQuestion = ({
  question = '',
  askee = '',
  status = '',
} = {}) => {
  return {
    type: 'REJECTION::CREATE_QUESTION',
    payload: {
      question,
      askee,
      status,
    }
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
    const data = yield call(useRejections, id);
    yield put(addFetchedQuestions(data));
  } catch (err) {
    yield put(handleFetchStateError(err));
  }
};

function* saveRejection({ payload } = { payload: { question: '', askee: '', status: '' } }) {
  try {
    const { question, askee, status } = payload;
    const userID = yield select(getID);
    const data = yield call(createRejection, { question, askee, status }, userID);
    yield put(addQuestion(data));
  } catch (err) {
    yield put(handleError(err));
  }
}

function* watchFetchID() {
  yield takeEvery(handleFetchID().type, fetchID)
};

function* watchFetchState() {
  yield takeEvery(handleFetchState().type, fetchState);
};

function* watchSaveRejection() {
  yield takeEvery(createQuestion().type, saveRejection);
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
  saveRejection,
  handleFetchID,
  handleFetchState,
  handleError,
  handleFetchStateError,
  createQuestion
};

export default rootSaga;
