import {select, takeEvery} from 'redux-saga/effects';

/**
 * Function to demonstrate logging on console.log using sagas
 * @param action
 */

function* logger(action: any) {
  const state = yield select();
  console.log('Action:', action);
  console.log('State After:', state);
}

export default function* rootSaga() {
  yield takeEvery('*', logger);
}

