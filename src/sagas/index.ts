import { all, fork } from 'redux-saga/effects';
import { watchGetGitCommitLog } from './gitCommitSagas';

export const rootSaga = function* root() {
  yield all([fork(watchGetGitCommitLog)]);
};
