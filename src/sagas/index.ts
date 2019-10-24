import { all, fork } from 'redux-saga/effects';
import { watchGetGitCommitLog } from './gitCommitSagas';
import { watchLoadGitDiff } from './gitDiffSagas';
import { watchLoadGitJSON } from './gitJSONSagas';

export const rootSaga = function* root() {
  yield all([fork(watchGetGitCommitLog), fork(watchLoadGitDiff), fork(watchLoadGitJSON)]);
};
