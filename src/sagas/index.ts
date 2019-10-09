import { all, fork } from 'redux-saga/effects';
import { watchGetGitCommitLog } from './gitCommitSagas';
import { watchLoadGitDiff } from './gitDiffSagas';

export const rootSaga = function* root() {
  yield all([fork(watchGetGitCommitLog), fork(watchLoadGitDiff)]);
};
