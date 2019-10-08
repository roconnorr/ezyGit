import { put, takeEvery } from 'redux-saga/effects';
import * as git from 'isomorphic-git';
import { GitCommitLog } from '../git/newGit';
import { getGitLogCompletedAction } from '../actions/gitLog.action';
import { actionIds } from '../actions';

export function* watchGetGitCommitLog() {
  console.log('Made it to the watcher');
  yield takeEvery(actionIds.GET_GIT_COMMIT_LOG, requestNewGitLog);
}

function* requestNewGitLog() {
  let options = { dir: "", depth: 20 };
  const results = yield git.log(options);

  const modifiedLog: Array<GitCommitLog> = results.map((commitHistory: any) => {
    return {
      isHistory: true,
      commit: commitHistory,
    };
  });

  // Insert blank commit at the start
  modifiedLog.unshift({ isHistory: false });

  yield put(getGitLogCompletedAction(modifiedLog));
}
