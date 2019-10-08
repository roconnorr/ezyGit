import { call, put, takeEvery } from 'redux-saga/effects';
import { actionIds } from '../actions';
import { Git } from '../git/newGit';
import { FileWatcher } from '../git/watcher';
import { getGitCommitLogCompletedAction } from '../actions/gitCommitList.action';

const git = new Git('./', new FileWatcher());

export function* watchGetGitCommitLog() {
  console.log('Made it to the watcher');
  yield takeEvery(actionIds.GET_GIT_COMMIT_LOG, requestNewGitLog);
}

function* requestNewGitLog() {
  console.log('made it to the action');
  const gitLog = yield call(git.getGitLog);
  yield put(getGitCommitLogCompletedAction(gitLog));
}
